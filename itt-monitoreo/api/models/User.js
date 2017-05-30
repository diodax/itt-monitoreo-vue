/**
 * User.js
 *
 * @description :: Base model for all users. Extends the properties from their namesake models
 *                 located in the sails-permissions and sails-auth modules
 * @source      :: https://github.com/trailsjs/sails-auth/issues/119
 */

'use strict';
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {
  attributes: {
    // Common attributes to all users
    firstName: {
      type: 'string',
      required: true,
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      required: true,
      defaultsTo: ''
    },
    birthDate: {
      type: 'datetime',
      required: true,
      defaultsTo: Date.now()
    },
    phoneNumbers: {
      type: 'array',
      isArrayOfStrings: true
    },
    addresses: {
      type: 'array',
      isArrayOfStrings: true
    },

    // Doctor-exclusive attributes
    title: {
      type: 'string'
    },
    employers: {
      type: 'array',
      isArrayOfStrings: true
    },

    // Patient-exclusive attributes
    status: {
      type: 'string',
      enum: ['stable', 'critical']
    },
    insuranceCompany: {
      type: 'string'
    },
    device: {
      type: 'string'
    },
    assignedDoctor: {
      model: 'user'
    },

    // Relative-exclusive attributes
    assignedPatient: {
      model: 'user'
    }

  },

  // Custom types / validation rules
  // (available for use in this model's attribute definitions above)
  types: {
    /**
     * Checks if the inserted value is a valid array of strings
     * @param {string[]} value - The values Array to validate
     * @returns {boolean} True if the value meets the criteria, false otherwise
     */
    isArrayOfStrings: function(value) {
      return _.isArray(value) && _.every(value, function(i) { return typeof i === 'string'; });
    }
  }
});
