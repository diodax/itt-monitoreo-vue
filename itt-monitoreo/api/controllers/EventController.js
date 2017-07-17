/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `EventController.index()`
   */
  index: function (req, res) {
		Appointment.find()
			.populate('doctor')
			.populate('patient')
			.then(function onSuccess(appointments) {
				return res.json(appointments.map(function(element) {
					return {
						title: 'Dr. ' + element.doctor.lastName + ': Meeting with ' + element.patient.firstName,
						start: element.startDate,
						end: element.endDate
					};
				}));
			}).catch(function onFailure(err) {
				return res.serverError(err);
			});
  },

  /**
   * `EventController.doctorIndex()`
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
  				return res.json(appointments.map(function(element) {
  					return {
  						title: 'Dr. ' + element.doctor.lastName + ': Meeting with ' + element.patient.firstName,
  						start: element.startDate,
  						end: element.endDate
  					};
  				}));
        }).catch(function onFailure(err) {
          return res.serverError(err);
        });
    }
  },

  /**
   * `EventController.find()`
   */
  find: function (req, res) {
		Appointment.findOne({
    		id: req.params.id
    	}).populate('doctor')
			.populate('patient')
			.then(function onSuccess(appointment) {
				return res.json({
					title: 'Dr. ' + appointment.doctor.lastName + ': Meeting with ' + appointment.patient.firstName,
					start: appointment.startDate,
					end: appointment.endDate,
				});
			}).catch(function onFailure(err) {
				return res.serverError(err);
			});
  }
};
