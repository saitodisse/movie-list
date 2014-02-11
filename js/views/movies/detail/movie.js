/*global App */

'use strict';
App.module('Base.Views.Movies.Detail', function (Detail, App, Backbone, Marionette, $) {

  Detail.Movie = Marionette.ItemView.extend({
    template: 'movies/detail/movie'
  });

});