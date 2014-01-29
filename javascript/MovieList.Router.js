/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette) {
  // MovieList Router
  // ---------------
  MovieList.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home',
      'movies': 'movies',
      'movies/search/:query': 'goMovieSearch',
      'movies/:id': 'goMovieDetails',
      'movies/:id/thumbs/:thumbId': 'goMovieDetailThumb',
      'imovies': 'imovies',
      'about': 'about'
    }
  });

});
