/*global Backbone */
'use strict';

var MoviesMVC = new Backbone.Marionette.Application();

MoviesMVC.addRegions({
  main: '.main'
});



MoviesMVC.on('initialize:after', function () {
  Backbone.history.start();
});

// LOGS
MoviesMVC.addInitializer(function () {
    //__MELD_LOG('Handlebars', Handlebars.Compiler.prototype, 11);
    __MELD_LOG('MoviesMVC', Backbone.Marionette.Application.prototype, 10);
    __MELD_LOG('vent', MoviesMVC.vent, 12);
    // __MELD_LOG('LocalStorage', Backbone.LocalStorage.prototype, 12);
    // __MELD_LOG('ElasticSearcher', MoviesMVC.MovieList.ElasticSearcher.prototype, 12);

    __MELD_LOG('Controller', MoviesMVC.MovieList.Controller.prototype, 10);
    // __MELD_LOG('Router', MoviesMVC.MovieList.Router.prototype, 11);
    
    // __MELD_LOG('Search', MoviesMVC.MovieList.Models.Search.prototype, 3);
    // __MELD_LOG('Movie', MoviesMVC.MovieList.Models.Movie.prototype, 3);
    // __MELD_LOG('SearchCollection', MoviesMVC.MovieList.Models.SearchCollection.prototype, 3);
    // __MELD_LOG('MovieCollection', MoviesMVC.MovieList.Models.MovieCollection.prototype, 3);

    // __MELD_LOG('MenuView', MoviesMVC.MovieList.Views.MenuView.prototype, 21);
    // __MELD_LOG('LatestSearchesView', MoviesMVC.MovieList.Views.LatestSearchesView.prototype, 20);
    // __MELD_LOG('SearchInputView', MoviesMVC.MovieList.Views.SearchInputView.prototype, 20);
    // __MELD_LOG('IMoviesView', MoviesMVC.MovieList.Views.IMoviesView.prototype, 22);
    // __MELD_LOG('SearchResultView', MoviesMVC.MovieList.Views.SearchResultView.prototype, 22);
    // __MELD_LOG('SearchResultThumbsView', MoviesMVC.MovieList.Views.SearchResultThumbsView.prototype, 22);
    // __MELD_LOG('MovieDetailView', MoviesMVC.MovieList.Views.MovieDetailView.prototype, 22);
    // __MELD_LOG('MovieDetailThumbView', MoviesMVC.MovieList.Views.MovieDetailThumbView.prototype, 22);
    // __MELD_LOG('AboutView', MoviesMVC.MovieList.Views.AboutView.prototype, 21);
});
