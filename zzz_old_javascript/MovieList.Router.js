/*global App */
'use strict';

App.module('MovieList', function (MovieList, App, Backbone, Marionette) {
  // MovieList Router
  // ---------------
  Base.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'movies',
      'movies': 'movies',
      'moviesRealCollection': 'moviesRealCollection',
      'movies/search/:query': 'goMovieSearch',
      'movies/:id': 'goMovieDetails',
      'movies/:id/thumbs/:thumbId': 'goMovieDetailThumb',
      'imovies': 'imovies',
      'about': 'about'
    }
  });

});
