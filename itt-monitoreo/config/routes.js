/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //'*': 'index.html',


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  //'GET /test/list': 'TestController.list',
  'POST /register': {model: 'user', blueprint: 'create'},
  'POST /login': 'AuthController.callback',
  'GET /logout': 'AuthController.logout',

  'GET /event/:id': {
    controller: 'event',
    action: 'find'
  },
  'GET /event': {
    controller: 'event',
    action: 'index'
  },

  'GET /bucket': 'BucketController.find',
  'GET /bucketrange': 'BucketController.findRange',
  'GET /patient/:id/bucket/latest': 'BucketController.findLatest',
  'POST /bucket': 'BucketController.create',

  'GET /doctor/:id/appointment': {
    controller: 'appointment',
    action: 'doctorIndex'
  },

  'GET /doctor/:id/event': {
    controller: 'event',
    action: 'doctorIndex'
  },

  'GET /doctor/:id/patient': {
    controller: 'patient',
    action: 'doctorIndex'
  },

  'GET /doctor/:id/prescription': {
    controller: 'prescription',
    action: 'doctorIndex'
  },

  'GET /patient/:id/prescription': {
    controller: 'prescription',
    action: 'patientIndex'
  },

  'GET /doctor/:id/alertlog': 'AlertLogController.doctorIndex',
  'GET /patient/:id/alertlog': 'AlertLogController.patientIndex',
};
