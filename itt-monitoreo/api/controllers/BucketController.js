/**
 * BucketController
 *
 * @description :: Server-side logic for managing buckets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
var Promise = require('bluebird');

module.exports = {

  /**
   * `BucketController.find()`
   */
  find: function (req, res) {
		var username = req.param('username');
		var secs = req.param('secs');

		if (typeof username === 'undefined' || typeof secs === 'undefined') {
			return res.badRequest();
		} else {
			BucketService.pullData({ username: username, secs: parseInt(secs) }).then(function onSuccess(buckets){
				return res.json(buckets);
			}).catch(function onFailure(err) {
				return res.serverError(err);
			});
		}
  },

  findLatest: function(req, res) {
    var id = req.param('id');

    if (typeof id === 'undefined') {
			return res.badRequest();
		} else {
      Bucket.find({ patient: id }).sort('updatedAt DESC').limit(5).then(function onSuccess(buckets){
        if (!buckets) { return res.serverError('Bucket not found!'); }
				return res.json(buckets);
			}).catch(function onFailure(err) {
				return res.serverError(err);
			});
    }
  },

  /**
   * `BucketController.create()`
   */
  create: function (req, res) {
		var data = {
			username: req.body.username,
			timestamp: moment(new Date(), 'YYYY-MM-DDTHH:mm:ss'),       //  req.body.timestamp,
			bpm: req.body.bpm || null
		}

    var step1 = BucketService.pushData(data);
    var step2 = step1.then(function(bucket) {
      return AlertService.isWithinThreshold({ username: req.body.username, bpm: req.body.bpm });
    });

    Promise.join(step1, step2, function onSuccess(foundBucket, foundThreshold) {
      if (foundThreshold.result === true) {
        // Not Alert, reset the counter
        resetTotalTics(foundThreshold.user);
      } else {
        // Alert, update the counter
        incrementTotalTics(foundThreshold.user.id, foundThreshold.user, req.body.bpm);
      }
      return res.json(foundBucket);
    }).catch(function onFailure(err) {
			return res.serverError(err);
		});
  }
};

/* Functions */

function incrementTotalTics(id, user, bpm) {
  User.update(id, {
    totalTics: ++user.totalTics
  }).exec(function incrementDone(err, updated) {
    if (err) { sails.log.error(err); }
    if (updated[0].totalTics >= updated[0].requiredTics) {
      sails.log.warn("Enviando Alerta al servicio SMS...");
      // 1-829-572-5431
      AlertService.sendSMS({
        message: 'El paciente se encuentra en estado de emergencia!',
        phoneNumber: updated[0].phoneNumbers,
        subject: 'Alerta'
      });
      setTotalTics(updated[0].id, -30);

      // Updates log
      AlertLog.create({
        patient: updated[0].id,
        threshold: updated[0].bpmThreshold,
        bpm: bpm,
        timestamp: new Date()
      }).exec(function alertLogged(err, alert) {
        if (err) { sails.log.error(err); }
        else { sails.log.info('An alert was succesfully logged!'); };
      });
      // Ends updating log
    }
  });
}

function resetTotalTics(id) {
  User.update(id, {
    totalTics: 0,
    status: 'stable'
  }).exec(function incrementDone(err, updated) {
    if (err) { sails.log.error(err); }
    sails.log.info("Reset counter message" + updated);
  });
}

function setTotalTics(id, amount) {
  User.update(id, {
    totalTics: amount,
    status: 'critical'
  }).exec(function incrementDone(err, updated) {
    if (err) { sails.log.error(err); }
  });
}
