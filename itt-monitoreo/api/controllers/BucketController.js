/**
 * BucketController
 *
 * @description :: Server-side logic for managing buckets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');

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


  /**
   * `BucketController.create()`
   */
  create: function (req, res) {
		var data = {
			username: req.body.username,
			timestamp: moment(new Date(), 'YYYY-MM-DDTHH:mm:ss'),       //  req.body.timestamp,
			bpm: req.body.bpm || null
		}
		BucketService.pushData(data).then(function onSuccess(bucket){
			return res.json(bucket);
		}).catch(function onFailure(err) {
			return res.serverError(err);
		});
  }
};
