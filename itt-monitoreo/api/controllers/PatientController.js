/**
 * PatientController
 *
 * @description :: Server-side logic for managing patients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `PatientController.doctorIndex()`
   */
  doctorIndex: function(req, res) {
    var id = req.param('id');

    if (typeof id === 'undefined') {
      return res.badRequest();
    } else {
      User.find({ assignedDoctor: id })
        .populate('assignedDoctor')
        .then(function onSuccess(patients) {
          return res.json(patients);
        }).catch(function onFailure(err) {
          return res.serverError(err);
        });
    }
  }
};
