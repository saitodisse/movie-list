/*global App */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MovieView = Marionette.ItemView.extend({
    template: 'movie'
  });

});