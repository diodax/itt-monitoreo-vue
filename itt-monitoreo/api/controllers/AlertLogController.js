/**
 * AlertLogController
 *
 * @description :: Server-side logic for managing Alertlogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `AlertLogController.doctorIndex()`
   */
  doctorIndex: function (req, res) {
		var id = req.param('id');

		if (typeof id === 'undefined') {
			return res.badRequest();
		} else {
			User.find({ assignedDoctor : id })
				.then(function onSuccess(patients) {
					return AlertLog.find({ patient: patients.map(function(x) { return x.id; }) });
				}).then(function onSuccess(alerts) {
					return res.json(alerts);
				}).catch(function onFailure(err) {
					return res.serverError(err);
				});
		}
  },

  /**
   * `AlertLogController.patientIndex()`
   */
  patientIndex: function (req, res) {
		var id = req.param('id');

		if (typeof id === 'undefined') {
			return res.badRequest();
		} else {
			AlertLog.find({ patient: id })
				.populate('patient')
				.then(function onSuccess(alerts) {
					return res.json(alerts);
				}).catch(function onFailure(err) {
					return res.serverError(err);
				});
		}
  },
};
