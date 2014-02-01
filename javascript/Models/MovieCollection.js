/*global MoviesMVC */

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone) {

  Models.MovieCollection = Backbone.Collection.extend({
    model: Models.Movie,

    setCurrentMovie: function(movie) {
      this.currentMovie = movie;
    },

    getCurrentMovie: function() {
      return this.currentMovie;
    }
  });

});
