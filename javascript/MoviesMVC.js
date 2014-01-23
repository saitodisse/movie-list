/*global Backbone */
'use strict';

var MoviesMVC = new Backbone.Marionette.Application();
__MELD_LOG('MoviesMVC', MoviesMVC, 1);

MoviesMVC.addRegions({
  main: '#main'
});

MoviesMVC.on('initialize:after', function () {
  var _app = window._app = {};

  // _app.application = new MyApp.Application();
  // __MELD_LOG('Application', window._app.application, 1);

  // _app.application.init();

  Backbone.history.start();
});