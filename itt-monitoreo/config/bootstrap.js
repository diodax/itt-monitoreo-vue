/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  // first parameter is for the user/list of users, and the second parameter is for the role
  // var p1 = PermissionService.addUsersToRole('doctor', 'doctor');
  // var p2 = PermissionService.addUsersToRole('patient', 'patient');
  // var p3 = PermissionService.addUsersToRole('relative', 'relative');
  //
  // Promise.all([p1, p2, p3]).then(function onFullfilled() {
  //   sails.log('Added “doctor” to role doctor');
  //   sails.log('Added “patient” to role patient');
  //   sails.log('Added “relative” to role relative');
  //   //return cb();
  // }).catch(function onRejected(err) {
  //   //return cb(err);
  // });
  cb();
};
