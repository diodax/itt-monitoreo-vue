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
		var mins = req.param('mins');

		if (typeof username === 'undefined' || typeof mins === 'undefined') {
			return res.badRequest();
		} else {
			BucketService.pullData({ username: username, mins: parseInt(mins) }).then(function onSuccess(buckets){
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

  findRange: function (req, res) {
    var username = req.param('username');
    var startDate = req.param('startDate');
    var endDate = req.param('endDate');

    if (typeof username === 'undefined' || typeof startDate === 'undefined' || typeof endDate === 'undefined') {
			return res.badRequest();
		} else {
			BucketService.pullDataRange({ username: username, startDate: moment(startDate, 'YYYY-MM-DDTHH:mm:ss'), endDate: moment(endDate, 'YYYY-MM-DDTHH:mm:ss')}).then(function onSuccess(buckets){
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
			bpm: parseFloat(req.body.bpm),
      wearing: req.body.wearing
		}

    var step1 = BucketService.pushData(data);
    var step2 = step1.then(function(bucket) {
      return AlertService.isWithinThreshold({ username: req.body.username, bpm: req.body.bpm });
    });

    Promise.join(step1, step2, function onSuccess(foundBucket, foundThreshold) {
      if (foundThreshold.result === true) {
        // Not Alert, reset the counter
        resetTotalTics(foundThreshold.user.id, data.wearing);
      } else {
        // Alert, update the counter
        incrementTotalTics(foundThreshold.user.id, foundThreshold.user, req.body.bpm, data.wearing);
      }
      return res.json(foundBucket);
    }).catch(function onFailure(err) {
			return res.serverError(err);
		});
  }
};

/* Functions */

function incrementTotalTics(id, user, bpm, wearing) {
  User.update(id, {
    totalTics: ++user.totalTics
  }).exec(function incrementDone(err, updated) {
    if (err) { sails.log.error(err); }
    if (updated[0].totalTics >= updated[0].requiredTics) {
      sails.log.warn("Enviando Alerta al servicio SMS...");
      // 1-829-572-5431
      AlertService.sendSMS({
        message: 'El paciente se encuentra en estado de emergencia!',
        phoneNumbers: updated[0].phoneNumbers,
        subject: 'Alerta'
      }, function smsSent(err, sms) {
        if (err) { sails.log.error(err); }
        else { sails.log.info('The SMS was succesfully sent!'); };
        // Updates log
        AlertLog.create({
          patient: updated[0].id,
          threshold: updated[0].bpmThreshold,
          bpm: bpm,
          timestamp: new Date()
        }).exec(function alertLogged(err, alert) {
          if (err) { sails.log.error(err); }
          else { sails.log.info('An alert was succesfully logged!'); };
          sails.log.info(alert);
        });
        // Ends updating log
      });
      setTotalTics(updated[0].id, -30);
    }
  });
}

function resetTotalTics(id, wearing) {
  var status;
  if (wearing === 'true') {
    status = 'stable';
  } else if (wearing === 'false') {
    status = 'offline';
  }
  //sails.log.info(id);
  User.update(id, {
    totalTics: 0,
    status: status
  }).exec(function incrementDone(err, updated) {
    if (err) { sails.log.error(err); }
    sails.log.info("Reset counter message");
    //sails.log.info(updated[0]);
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
