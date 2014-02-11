/*global App */

'use strict';
App.module('Base.Views.Movies.Thumb', function (Thumb, App, Backbone, Marionette, $) {

  Thumb.Movie = Marionette.ItemView.extend({
    template: 'movies/thumb/movie'
  });

});