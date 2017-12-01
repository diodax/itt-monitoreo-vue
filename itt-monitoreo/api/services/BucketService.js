/**
 * BucketService
 *
 * @module      :: Bucket
 * @description :: Collection of helper methods related to the Bucket model handling
 * @docs        :: http://stackoverflow.com/questions/24214962/whats-the-proper-way-to-document-callbacks-with-jsdoc
 *                 http://sailsjs.com/documentation/concepts/services/creating-a-service
 */

'use strict';
var assert = require('assert');
var Promise = require('bluebird');
var moment = require('moment');

module.exports = {
  /**
   * Updates the Bucket structure with the appropiate data model
   *
   * @param {object} data - Dictionary with the data to update
   * @param {string} data.username - The Bucket's username property
   * @param {string} data.timestamp - The Bucket's timestamp property
   * @param {?number} data.bpm - The Bucket's bpm property
   * @param {string} [data.wearing] = The Bucket's wearing property
   * @param {requestCallback} done - The callback that handles the response. Returns an object as the data result. Compatible with Promises.
   */
  pushData: function(data, done) {
      assert.ok(typeof data !== 'undefined', 'argument "data" must be specified');
      assert.equal(typeof(data.username), 'string', 'argument "data.username" must be a string');
      assert.ok(moment(data.timestamp, 'YYYY-MM-DDTHH:mm:ss').isValid(),'argument "data.timestamp" must be a valid YYYY-MM-DDTHH:mm:ss datetime string');
      //assert.ok(_.isFinite(data.bpm) || (data.bpm === null && typeof data.bpm === 'object'), 'argument "data.bpm" must be null or a finite number');
      if (typeof data.wearing != "undefined") {
        sails.log.info("data");
        sails.log.info(data);
        //sails.log.info(typeof(data.wearing));
        //assert.ok(typeof(data.wearing) === typeof(true), 'argument "data.wearing" must be a boolean');
        //If it's false, change the status of the patient to offline
        if (data.wearing === 'false') {
          // Find the patient and update its status
          User.findOne({ username: data.username })
            .then(function onSuccess(foundUser) {
              if (!foundUser) {
                var err = 'The user ' + data.username + ' does not exist!';
                reject(err);
                return done(err);
              }
              // Update the user
              return User.update(foundUser.id, {status: 'offline'});
            })
            .then(function onSuccess(updatedUserList) {
              if (updatedUserList[0]) {
                sails.log.info("User " + updatedUserList[0].username + "'s status has been updated to 'offline'.");
                //sails.log.info(updatedUserList[0]);
              } else {
                sails.log.info('No user records were updated with the offline status.');
              }
            })
            .catch(function onFailure(err) {
              reject(err);
              return done(err);
            });
        }
      }

      // default parameter for the callback function
      done = typeof done !== 'undefined' ? done : function() {};

      // setting up some variables
      var minuteValue = moment(data.timestamp).minutes();
      var secondValue = moment(data.timestamp).seconds();
      var parsedTimestamp = new Date(data.timestamp);                     // parsing the timestamp string
      parsedTimestamp.setHours(parsedTimestamp.getHours() + 0, 0, 0, 0);  // set minutes, seconds and miliseconds to 0
      var readings = createReadingsObject(minuteValue, secondValue, data.bpm);

      return new Promise(function(fulfill, reject) {
        // Step 1: Checks if username is a valid user in the DB
        var step1 = User.findOne({ username: data.username });
        // Step 2: Checks if bucket exists in the DB
        var step2 = Bucket.findOne({ where: { hourTimestamp: parsedTimestamp } }).populate('patient', { username: data.username });

        Promise.join(step1, step2, function(foundUser, foundBucket) {
          if (!foundUser) {
            var err = 'The user ' + data.username + ' does not exist!';
            reject(err);
            return done(err);
          }

          if (!foundBucket) {
            // Bucket entity doesn't exist, create new one
            sails.log.info('Creating Bucket...');
            return Bucket.create({
              patient: foundUser,
              hourTimestamp: parsedTimestamp,
              numSamples: 1,
              totalSamples: parseInt(data.bpm),
              values: readings
            });
          } else {
            var newValues = foundBucket.values;
            newValues = _.set(newValues, minuteValue + '.' + secondValue, data.bpm);
            // Bucket entity exists, update
            sails.log.info('Updating Bucket...');
            return Bucket.update(foundBucket.id, {
              numSamples: foundBucket.numSamples + 1,
              totalSamples: parseInt(foundBucket.totalSamples) + parseInt(data.bpm),
              values: newValues
            });
          }
        }).then(function onSuccess(bucket) {
          if (_.isArray(bucket) === false) {
            sails.log.info('Bucket at ' + bucket.hourTimestamp + ' created! Number of samples is: ' + bucket.numSamples);
            sails.log.info('The last registered value is: ' + data.bpm);
          } else if (bucket.length > 0) {
            sails.log.info('Bucket at ' + bucket[0].hourTimestamp + ' updated! Number of samples is: ' + bucket[0].numSamples);
            sails.log.info('The last registered value is: ' + data.bpm);
          }
          fulfill(bucket);
          return done(null, bucket);
        }).catch(function onFailure(err) {
          reject(err);
          return done(err);
        });

      });
  },

  /**
   * Returns a collection of buckets that match the filter's search parameters
   *
   * @param {object} options - Dictionary with the helper's arguments
   * @param {string} options.username - The option's username search parameter
   * @param {number} options.mins - The option's mins search parameter
   * @param {requestCallback} done - The callback that handles the response. Returns an object as the data result. Compatible with Promises.
   */
  pullData: function(options, done) {
      assert.ok(typeof options !== 'undefined', 'argument "options" must be specified');
      assert.equal(typeof(options.username), 'string', 'argument "options.username" must be a string');
      assert.ok(_.isFinite(options.mins), 'argument "options.mins" must be a finite number');

      // default parameter for the callback function
      done = typeof done !== 'undefined' ? done : function() {};

      // setting up some variables
      var currentDate = new Date();
      var queriedSecsInHours = Math.ceil(options.mins / 60.0);
      var currentDateNoMinutes = new Date();
      currentDateNoMinutes.setMinutes(0, 0, 0);
      var startDate = new Date();
      startDate.setHours(startDate.getHours() - queriedSecsInHours);

      return new Promise(function(fulfill, reject) {
        // Step 1: Checks if username is a valid user in the DB
        var step1 = User.findOne({ username: options.username });
        // Step 2: Finds the bucket or creates an empty one
        var step2 = step1.then(function(user) {
          if (!user) {
            var err = 'The user ' + options.username + ' does not exist!';
            reject(err);
            return done(err);
          }
          return Bucket.findOrCreate({
            hourTimestamp: {
              'greaterThanOrEqual': startDate,
              'lessThanOrEqual': currentDate
            }
          }, {
            patient: user,
            hourTimestamp: currentDateNoMinutes,
            numSamples: 0,
            totalSamples: parseInt(0),
            values: createReadingsObject()
          }).populate('patient', { username: options.username }).sort('hourTimestamp DESC');
        });

        Promise.join(step1, step2, function onSuccess(foundUser, foundBuckets) {
          if (!foundBuckets) {
            var err = 'There are no records associated with the user ' + options.username;
            reject(err);
            return done(err);
          }
          var result = handleBucketValues(foundBuckets, options.mins);
          fulfill(result);
          return done(null, result);
        }).catch(function onFailure(err) {
          reject(err);
          return done(err);
        });
      });
  },
};

/* Functions */

function createReadingsObject(valMinute, valSecond, bpm) {
  // Create json object with default values
  var readings = {};
  for (var j = 0; j < 60; j++) {
    var minute = {};
    for (var i = 0; i < 60; i++) {
      minute[i] = 0;
    }
    readings[j] = minute;
  }

  if ((valMinute !== undefined) && (valSecond !== undefined) && (bpm !== undefined)) {
    var tempMin = readings[valMinute];
    tempMin[valSecond] = bpm;
    readings[valMinute] = tempMin;
  }
  return readings;
}

function handleBucketValues(buckets, totalPoints) {
  // totalPoints = total amount of mins to push into the resulting array
  var data = [];

  // check if buckets is not an array, and make it so
  if (_.isArray(buckets) === false) {
    buckets = [buckets];
  }

  var currentHour = moment().hours();
  var currentMinute = moment().minutes();
  var currentSecond = moment().seconds();
  var firstIteration = true;

  _.forEach(buckets, function(bucket) {
    // iterates through each bucket object
    if (firstIteration) {
      firstIteration = false;
    } else {
      currentMinute = 59;
    }

    for (var min = currentMinute; min >= 0; min--) {
      // every min, counting backwards
      var maxSecs = 59;
      if (min === currentMinute && firstIteration === true) {
        maxSecs = currentSecond; // only occurs on the first iteration
      }
      // set a variable to calculate the average later
      var totalSumValues = 0;
      var totalCountValues = 0;
      var totalAverage = 0.0;
      for (var sec = maxSecs; sec >= 0; sec--) {
        // every sec, counting backwards
        if (data.length < totalPoints) {
          var value = _.get(bucket.values, min.toString() + '.' + sec.toString(), 0);
          totalSumValues += parseFloat(value);
          if (parseFloat(value) > 0) {
            totalCountValues++;
          }
          //data.push(value);
        }
      }
      // get the average of readings
      if (totalCountValues > 0) {
        totalAverage = (totalSumValues * 1.0) / (totalCountValues * 1.0);
      }
      data.push(totalAverage);
    }
  });

  // Zip the generated y values with the x values
  var result = [];
  for (var i = 0; i < data.length; ++i) {
    result.push({
      timestamp: i,
      bpm: data[i]
    });
  }
  // Flips the array so that the newest value appears on the right instead of the left
  return result.reverse();
}
