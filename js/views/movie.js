/*global App */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.Movie = Marionette.ItemView.extend({
    template: 'movie'
  });

});