/**
 * AlertService
 *
 * @module      :: Alert
 * @description :: Collection of helper methods related to the AlertLog model handling
 * @docs        :: http://stackoverflow.com/questions/24214962/whats-the-proper-way-to-document-callbacks-with-jsdoc
 *                 http://sailsjs.com/documentation/concepts/services/creating-a-service
 */

'use strict';
var assert = require('assert');
var Promise = require('bluebird');
var moment = require('moment');
var request = require('request');

module.exports = {
  /**
   * Returns a collection of buckets that match the filter's search parameters
   *
   * @param {object} options - Dictionary with the helper's arguments
   * @param {string} options.username - The option's username search parameter
   * @param {number} options.bpm - The option's bpm search parameter
   * @param {requestCallback} done - The callback that handles the response. Returns an object as the data result. Compatible with Promises.
   */
  isWithinThreshold: function(options, done) {
    assert.ok(typeof options !== 'undefined', 'argument "options" must be specified');
    assert.equal(typeof(options.username), 'string', 'argument "options.username" must be a string');
    //assert.ok(_.isFinite(options.bpm), 'argument "options.bpm" must be a finite number');

    // default parameter for the callback function
    done = typeof done !== 'undefined' ? done : function() {};

    return new Promise(function(fulfill, reject) {
      User.findOne({ username: options.username })
        .then(function onSuccess(foundUser) {
          if (!foundUser) {
            var err = 'The user ' + options.username + ' does not exist!';
            reject(err);
            return done(err);
          }
          if (foundUser.bpmThreshold) {
            if (foundUser.bpmThreshold[0] <= options.bpm && foundUser.bpmThreshold[1] >= options.bpm) {
              fulfill({ result: true, user: foundUser });
              return done(null, { result: true, user: foundUser });
            } else {
              fulfill({ result: false, user: foundUser });
              return done(null, { result: false, user: foundUser });
            }
          } else {
            reject(err);
            return done(err);
          }
        })
        .catch(function onFailure(err) {
          reject(err);
          return done(err);
        });
    });
  },

  /**
   * Sends a SMS through Amazon's SNS Services
   *
   * @param {object} options - Dictionary with the helper's arguments
   * @param {string} options.message - The option's message parameter
   * @param {string[]} options.phoneNumbers - The option's bpm search parameter
   * @param {string[]} options.subject - The option's subject parameter
   * @param {requestCallback} done - The callback that handles the response. Returns an object as the data result. Compatible with Promises.
   */
  sendSMS: function(options, done) {
    assert.ok(typeof options !== 'undefined', 'argument "options" must be specified');
    assert.equal(typeof(options.message), 'string', 'argument "options.message" must be a string');
    assert.equal(typeof(options.subject), 'string', 'argument "options.subject" must be a string');

    // default parameter for the callback function
    done = typeof done !== 'undefined' ? done : function() {};

    // setting up some variables
    var api_id = "5yshdz2sfg";
    var region_id = "us-east-1";
    var url = "https://" + api_id +  ".execute-api." + region_id + ".amazonaws.com/prod/sns-publish";

    return new Promise(function(fulfill, reject) {

      if (_.isArray(options.phoneNumbers)) {
        // forEach request
        for (var i = 0; i < options.phoneNumbers.length; i++) {
          request.post({
              url: url,
              json: true,
              body: {
                subject: options.subject,
                message: options.message,
                phoneNumber: options.phoneNumbers[i]
              } },
              function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                      sails.log.info(body);
                      fulfill(body);
                      return done(null, body);
                  } else {
                    sails.log.info(error);
                    reject(error);
                    return done(error);
                  }
              }
          );
        }
      } else {
        // single request
        request.post({
            url: url,
            json: true,
            body: {
              subject: options.subject,
              message: options.message,
              phoneNumber: options.phoneNumbers
            } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    sails.log.info(body);
                    fulfill(body);
                    return done(null, body);
                } else {
                  sails.log.info(error);
                  reject(error);
                  return done(error);
                }
            }
        );
      }
    });
  },

  sendEmail: function(options, done) {
    assert.ok(typeof options !== 'undefined', 'argument "options" must be specified');

    // default parameter for the callback function
    done = typeof done !== 'undefined' ? done : function() {};

    return new Promise(function(fulfill, reject) {});
  },
};

/* Functions */
