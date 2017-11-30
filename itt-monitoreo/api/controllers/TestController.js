/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `TestController.list()`
   */
  list: function (req, res) {
    return res.json({
      todo: 'list() is not implemented yet!'
    });
  },


	testsms: function (req, res) {
		//
		AlertService.sendSMS({
			message: 'El paciente se encuentra en estado de emergencia!',
			phoneNumbers: '1-908-943-2094',
			subject: 'Alerta'
		}, function messageSent(err, sms) {
			if (err) { return res.serverError(err); }
			return res.json(sms);
		});
	},

  testlog: function (req, res) {

    // Updates log
    AlertLog.create({
      patient: '595b1daf5264b22a087d253c',
      threshold: [60, 100],
      bpm: '230',
      timestamp: new Date()
    }).exec(function alertLogged(err, alert) {
      if (err) { return res.serverError(err); }
      else { sails.log.info('An alert was succesfully logged!'); };
      sails.log.info(alert);
      return res.json(alert);
    });
    // Ends updating log

  }

};
