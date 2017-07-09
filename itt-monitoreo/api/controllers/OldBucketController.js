/**
 * BucketController
 *
 * @description :: Server-side logic for managing buckets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';
var moment = require('moment');

module.exports = {

  update: function(req, res) {
    // Check if req.username is a valid user
    User.findOne({
        username: req.body.username
      })
      .exec(function getUserCallback(err, user) {
        if (err) {
          return res.serverError(err);
        }
        if (!user) {
          return res.json('The user ' + req.body.username + " doesn't exist!");
        }
        req.user = user;

        // Check if req.timestamp is a valid datetime
        var isTimestampValid = moment(req.body.timestamp, "YYYY-MM-DDTHH:mm:ss").isValid();
        //sails.log.info('isTimestampValid: ' + isTimestampValid);

        if (isTimestampValid === false) {
          sails.log.info('The timestamp is not valid!', req.body.timestamp);
          return res.serverError("The timestamp is not valid!");
        }

        var d = new Date(req.body.timestamp);
        //d.setMinutes(0, 0, 0);
        d.setHours(d.getHours() + 4, 0, 0, 0);

        var parsedTimestamp = d; //   moment(req.body.timestamp).minutes(0).seconds(0).milliseconds(0); //.toISOString();
        var valMinute = moment(req.body.timestamp).minutes();
        var valSecond = moment(req.body.timestamp).seconds();

        //sails.log.info('Timestamp received as: ' + req.body.timestamp);
        //sails.log.info('Timestamp parsed as: ' + parsedTimestamp);

        Bucket.findOne({
            where: {
              hourTimestamp: parsedTimestamp
            }
            //where: { hourTimestamp: new Date(moment(parsedTimestamp).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z') }
          }).populate('patient', {
            username: user.username
          })
          .exec(function(err, found) {
            if (err) {
              return res.serverError(err);
            }
            if (!found) {
              var readings = createReadingsObject(valMinute, valSecond, req.body.bpm);
              createBucket(user, parsedTimestamp, readings, req, res);
            } else {
              updateBucket(found, valMinute, valSecond, req, res);
            }

            //Message validations
            //check if bpm value is below the threshold or not

            Message.find({
                requiredTics: {
                  '>=': 0
                }
              }).populate('user', {
                username: user.username
              })
              .exec(function getMessajeCallback(err, found) {
                //sails.log.info(found[0]);
                sails.log.info("Threshold is: " + found[0].bpmThreshold + " and BPM is: " + req.body.bpm);
                if (err) {
                  return res.serverError(err);
                }
                if (found[0].bpmThreshold >= req.body.bpm) {
                  // Alert, update the counter
                  incrementTotalTics(found[0].id, found[0]);
                } else {
                  // Not Alert, reset the counter
                  resetTotalTics(found[0].id);
                }
              });
          });
      });
  },

  pull: function(req, res) {
    var username = req.param('username'); // Parameter: user name
    var secs = req.param('secs'); // Parameter: secs

    if (typeof username !== 'undefined' && typeof secs !== 'undefined') {
      getBucket(username, secs, req, res);
    } else {
      return res.badRequest();
    }
  }
};


/* Functions */

function incrementTotalTics(id, message) {
  Message.update(id, {
    totalTics: ++message.totalTics
  }).exec(function incrementDone(err, updated) {
    if (err) {
      return res.serverError(err);
    }
    //sails.log.info("Increased counter message" + JSON.stringify(updated));
    //sails.log.info("totalTics: " +  updated[0].totalTics + " requiredTics: " + updated[0].requiredTics);
    //sails.log.info(updated[0].totalTics >= updated[0].requiredTics);
    if (updated[0].totalTics >= updated[0].requiredTics) {
      sails.log.warn("Enviando Alerta al servicio SMS...");
      // 1-829-572-5431
      LambdaService.sendSMS({
        message: 'El paciente se encuentra en estado de emergencia!',
        phoneNumber: '1-829-572-5431',
        subject: 'Alerta'
      });
      setTotalTics(updated[0].id, -30);
    }
  });
}

function resetTotalTics(id) {
  Message.update(id, {
    totalTics: 0
  }).exec(function incrementDone(err, updated) {
    if (err) {
      return res.serverError(err);
    }
    // idk lol
    sails.log.info("Reset counter message" + updated);
  });
}

function setTotalTics(id, amount) {
  Message.update(id, {
    totalTics: amount
  }).exec(function incrementDone(err, updated) {
    if (err) {
      return res.serverError(err);
    }
    // idk lol
    //sails.log.info("Set counter message" + updated);
  });
}

function getBucket(username, secs, req, res) {
  var date = new Date();
  var hours = Math.ceil((secs / 60.0) / 60.0);

  var d = new Date();
  d.setMinutes(0, 0, 0);

  var dateG = new Date();
  dateG.setHours(dateG.getHours() - hours);

  //sails.log.info('hours: ' + hours);
  //sails.log.info("Timestamp to create: " + d);
  //sails.log.info('greaterThanOrEqual ' + dateG);
  //sails.log.info('lessThanOrEqual ' + date);

  User.findOne({
      username: username
    })
    .exec(function getUserCallback(err, user) {
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.json("The user " + username + " doesn't exist!");
      }

      // finds the bucket or creates an empty one
      Bucket.findOrCreate({
          hourTimestamp: {
            'greaterThanOrEqual': dateG,
            'lessThanOrEqual': date
          }
        }, {
          patient: user,
          hourTimestamp: d,
          numSamples: 0,
          totalSamples: parseInt(0),
          values: createReadingsObject()
        })
        .populate('patient', {
          username: username
        })
        //.where({ hourTimestamp: { 'greaterThanOrEqual': date.setHours(date.getHours() - hours), 'lessThanOrEqual': date } })
        .sort('hourTimestamp DESC')
        //.limit(Math.ceil((secs / 60.0) / 60.0 ))
        .exec(getBucketCallback.bind(null, res, secs));
    });
}

function getBucketCallback(res, secs, err, buckets) {
  if (err) {
    return res.serverError(err);
  }
  if (!buckets) {
    return res.json("The records associated with the user " + username + "don't exist!");
  } else {
    return res.json(handleBucketValues(buckets, secs));
  }
}

function handleBucketValues(buckets, totalPoints) {
  // totalPoints = total amount of secs to push into the resulting array
  var data = [];

  // check if buckets is not an array, and make it so
  if (_.isArray(buckets) == false) {
    buckets = _.castArray(buckets);
  }

  var currentHour = moment().hours();
  var currentMinute = moment().minutes();
  var currentSecond = moment().seconds();
  var firstIteration = true;

  //sails.log.info(_.omit(buckets,'values'));
  //sails.log.info(moment());
  //sails.log.info("current hour: " + currentHour);
  //sails.log.info("current minute: " + currentMinute);
  //sails.log.info("current second: " + currentSecond);
  //sails.log.info(buckets);
  _.forEach(buckets, function(bucket) {
    // iterates through each bucket object
    //var totalMinutes = Math.floor(bucket.numSamples / 60);
    //var remainingSeconds = bucket.numSamples - (totalMinutes * 60);

    if (firstIteration) {
      firstIteration = false;
    } else {
      currentMinute = 59;
    }

    //sails.log.info("bucket: " + bucket);
    //sails.log.info("totalMinutes: " + totalMinutes);
    //sails.log.info("remainingSeconds: " + remainingSeconds);

    for (var min = currentMinute; min >= 0; min--) {
      // every min, counting backwards
      var maxSecs = 59;
      if (min == currentMinute && firstIteration == true) {
        maxSecs = currentSecond; // only occurs on the first iteration
      }
      //sails.log.info("maxSecs: " + maxSecs);

      for (var sec = maxSecs; sec >= 0; sec--) {
        // every sec, counting backwards
        if (data.length < totalPoints) {
          //sails.log.info(bucket.values);
          var value = _.get(bucket.values, min.toString() + '.' + sec.toString(), 0);
          //sails.log.info("value from [" + min + ", " + sec + "]: " + value);
          data.push(value);
        }
      }
    }
  });
  //sails.log.info(data);

  // Zip the generated y values with the x values
  var result = [];
  for (var i = 0; i < data.length; ++i) {
    result.push([i, data[i]]);
  }
  //sails.log.info(result);
  //sails.log.info("Bucket pulled at: " + new Date());
  return result;
}

function createBucket(user, timestamp, readings, req, res) {
  Bucket.create({
    patient: user,
    hourTimestamp: timestamp,
    numSamples: 1,
    totalSamples: parseInt(req.body.bpm),
    values: readings
  }).exec(function(err, bucket) {
    if (err) {
      return res.serverError(err);
    }
    sails.log.info('Bucket created at: ', bucket.hourTimestamp);
    return res.json({
      user: req.user.toJSON(),
      bucket: bucket
    });
  });
}

function updateBucket(bucket, valMinute, valSecond, req, res) {
  var newValues = _.update(bucket.values, valMinute + '.' + valSecond, function(n) {
    return req.body.bpm;
  });

  Bucket.update(bucket.id, {
      numSamples: bucket.numSamples + 1,
      totalSamples: parseInt(bucket.totalSamples) + parseInt(req.body.bpm),
      values: newValues
    })
    .exec(function(err, updated) {
      if (err) {
        return res.serverError(err);
      }
      sails.log.info('Bucket at ' + bucket.hourTimestamp + ' updated! Number of samples is: ' + (bucket.numSamples + 1));
      return res.json({
        user: req.user.toJSON(),
        bucket: updated
      });
    });
}

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
  //sails.log.info(readings);
  return readings;
}
