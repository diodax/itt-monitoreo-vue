/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing Appointments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
   * `AppointmentController.doctorIndex()`
   */
  doctorIndex: function (req, res) {
    var id = req.param('id');

    if (typeof id === 'undefined') {
      return res.badRequest();
    } else {
      Appointment.find({ doctor: id })
        .populate('doctor')
        .populate('patient')
        .then(function onSuccess(appointments) {
          return res.json(appointments);
        }).catch(function onFailure(err) {
          return res.serverError(err);
        });
    }
  },
	//
	// single: function (req, res) {
	// 	return res.json({
  //     todo: 'index() is not implemented yet!'
  //   });
	// }


};
