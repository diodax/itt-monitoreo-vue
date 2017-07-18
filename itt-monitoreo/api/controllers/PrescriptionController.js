/**
 * PrescriptionController
 *
 * @description :: Server-side logic for managing prescriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
   * `PrescriptionController.doctorIndex()`
   */
  doctorIndex: function(req, res) {
    var id = req.param('id');

    if (typeof id === 'undefined') {
      return res.badRequest();
    } else {
      Prescription.find({ doctor: id })
				.populate('doctor')
        .populate('patient')
        .then(function onSuccess(prescriptions) {
          return res.json(prescriptions);
        }).catch(function onFailure(err) {
          return res.serverError(err);
        });
    }
  },

	/**
   * `PrescriptionController.patientIndex()`
   */
  patientIndex: function(req, res) {
    var id = req.param('id');

    if (typeof id === 'undefined') {
      return res.badRequest();
    } else {
      Prescription.find({ patient: id })
				.populate('doctor')
        .populate('patient')
        .then(function onSuccess(prescriptions) {
          return res.json(prescriptions);
        }).catch(function onFailure(err) {
          return res.serverError(err);
        });
    }
  }

};
