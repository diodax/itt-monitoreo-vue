/**
 * Appointment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    doctor: {
      model: 'user'
    },

    patient: {
      model: 'user'
    },

    startDate: {
      type: 'datetime',
      required: true,
      defaultsTo: Date.now()
    },

    endDate: {
      type: 'datetime',
      required: true,
      defaultsTo: Date.now()
    },

    comments: {
      type: 'string'
    }

    //title,
    //description, observations

  }
};
