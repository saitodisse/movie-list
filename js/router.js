/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette) {
  Base.Router = Marionette.AppRouter.extend({
    appRoutes: {
      // '': 'movies',
      // 'movies': 'movies',
      // 'moviesRealCollection': 'moviesRealCollection',
      'movies/table/search/:page/:query': 'searchTable',
      'movies/thumb/search/:page/:query': 'searchThumb',
      // 'movies/:id': 'goMovieDetails',
      // 'movies/:id/thumbs/:thumbId': 'goMovieDetailThumb',
      'imovies': 'imovies',
      'about': 'about',
      //'changeLayout': 'changeLayout'
    }
  });

});
