/**
 * AlertLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
'use strict';

module.exports = {

  attributes: {

    patient: {
      model: 'user',
      required: true
    },

    threshold : {
      type: 'array',
      //isArrayOfIntegers: true
    },

    bpm : {
      type: 'string'
    },

    timestamp : {
      type: 'datetime',
      defaultsTo: function () {
            return new Date();
        }
    },
  },

  // Custom types / validation rules
  // (available for use in this model's attribute definitions above)
  types: {
    /**
     * Checks if the inserted value is a valid array of integers
     * @param {integer[]} value - The values Array to validate
     * @returns {boolean} True if the value meets the criteria, false otherwise
     */
    isArrayOfIntegers: function(value) {
      return _.isArray(value) && _.every(value, function(i) { return _.isInteger(i); });
    },
  }
};
