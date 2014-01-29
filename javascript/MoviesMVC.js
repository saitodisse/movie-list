/*global Backbone */
'use strict';

var MoviesMVC = new Backbone.Marionette.Application();

MoviesMVC.addRegions({
  main: '.main'
});

MoviesMVC.on('initialize:after', function () {
  Backbone.history.start();
});