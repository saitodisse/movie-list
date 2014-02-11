/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette) {
  Base.Router = Marionette.AppRouter.extend({
    appRoutes: {
      // '': 'movies',
      // 'movies': 'movies',
      // 'moviesRealCollection': 'moviesRealCollection',
      'movies/search/:page/:query': 'search',
      // 'movies/:id': 'goMovieDetails',
      // 'movies/:id/thumbs/:thumbId': 'goMovieDetailThumb',
      'imovies': 'imovies',
      'about': 'about',
      //'changeLayout': 'changeLayout'
    }
  });

});
