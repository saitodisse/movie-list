/*global App */

'use strict';
App.module('Base.Models', function (Models, App, Backbone) {

  Models.MovieCollection = Backbone.Collection.extend({
    model: Models.Movie,

    url: '#',

    setCurrentMovie: function(movie) {
      this.currentMovie = movie;
    },

    getCurrentMovie: function() {
      return this.currentMovie;
    }

  });

});
