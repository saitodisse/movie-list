/*global Backbone */
'use strict';

var App = new Backbone.Marionette.Application();

App.addRegions({
  main: '#main'
});

App.on('initialize:after', function () {
  Backbone.history.start();
});


App.addInitializer(function () {

  // ensures that no errors will be omitted
  RSVP.on('error', function(reason) {
    console.error(reason);
  });

  startLogs();
  
  App.controller = new App.Base.Controller();
  App.router = new App.Base.Router({
    controller: App.controller
  });

  // App.menuView = new App.Base.Views.MenuView({
  //   el: $('.mainMenu')[0]
  // });

  // App.searchInputView = new App.Base.Views.SearchInputView({
  //   el: $('#q')[0]
  // });

});

function startLogs () {
  // __MELD_LOG('Region', Marionette.Region.prototype, 10);
  __MELD_LOG('Layout', Marionette.Layout.prototype, 11);

  //__MELD_LOG('Handlebars', Handlebars.Compiler.prototype, 11);
  __MELD_LOG('App', Backbone.Marionette.Application.prototype, 10);
  __MELD_LOG('vent', App.vent, 12);
  // __MELD_LOG('LocalStorage', Backbone.LocalStorage.prototype, 12);
  // __MELD_LOG('ElasticSearcher', App.Base.ElasticSearcher.prototype, 12);

  __MELD_LOG('controller', App.Base.Controller.prototype, 11);
  __MELD_LOG('MV_control', App.Base.MoviesController.prototype, 12);
  
  // __MELD_LOG('Router', App.Base.Router.prototype, 11);
  
  // __MELD_LOG('Movie', App.Base.Models.Movie.prototype, 3);
  // __MELD_LOG('MovieCollection', App.Base.Models.MovieCollection.prototype, 3);
  // __MELD_LOG('Search', App.Base.Models.Search.prototype, 3);
  // __MELD_LOG('SearchCollection', App.Base.Models.SearchCollection.prototype, 3);

  // __MELD_LOG('Tables-View', App.Base.Views.Movies.Table.Movies.prototype, 21);
  // __MELD_LOG('Table-View', App.Base.Views.Movies.Table.Movie.prototype, 22);
  
  // __MELD_LOG('MenuView', App.Base.Views.MenuView.prototype, 21);
  // __MELD_LOG('LatestSearchesView', App.Base.Views.LatestSearchesView.prototype, 20);
  // __MELD_LOG('SearchInputView', App.Base.Views.SearchInputView.prototype, 20);
  // __MELD_LOG('IMoviesView', App.Base.Views.IMoviesView.prototype, 22);
  // __MELD_LOG('SearchResultView', App.Base.Views.SearchResultView.prototype, 22);
  // __MELD_LOG('MovieDetailView', App.Base.Views.MovieDetailView.prototype, 22);
  // __MELD_LOG('MovieDetailThumbView', App.Base.Views.MovieDetailThumbView.prototype, 22);
  // __MELD_LOG('AboutView', App.Base.Views.AboutView.prototype, 21);

}