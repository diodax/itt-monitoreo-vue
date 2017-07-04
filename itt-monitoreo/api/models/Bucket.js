/**
 * Bucket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    patient: {
      model: 'user',
      required: true
    },

    // Hour timestamp that represents the reading of the bucket
    hourTimestamp: {
        type: 'datetime',
        required: true,
        defaultsTo: Date.now()
    },

    // Number of samples collected
    numSamples: {
        type: 'integer',
        defaultsTo: 0
    },

    // Sum of all of the readings collected
    totalSamples: {
        type: 'integer',
        defaultsTo: 0
    },

    values: {
      type: 'json',
      defaultsTo: function() {
          var readings = {};
          var minute = {};
          for (var i = 0; i < 60; i++) {
              minute[i] = 0;
          }
          for (var j = 0; j < 60; j++) {
              readings[i] = minute;
          }
          return readings;
      }
    },

  }
};
