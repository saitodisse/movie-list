/*global Backbone */
'use strict';

var App = new Backbone.Marionette.Application();

App.addRegions({
  main: '.main'
});



App.on('initialize:after', function () {
  Backbone.history.start();
});