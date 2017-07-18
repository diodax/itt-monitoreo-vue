/**
 * Prescription.js
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

    date: {
      type: 'datetime',
      required: true,
      defaultsTo: Date.now()
    },

    caseHistory: {
      type: 'string'
    },

    medication: {
      type: 'string'
    },

    notes: {
      type: 'string'
    },

  }
};
