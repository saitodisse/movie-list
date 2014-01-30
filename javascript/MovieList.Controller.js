/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {

  // MovieList Controller (Mediator)
  // ------------------------------
  //
  // Control the workflow and logic that exists at the application
  // level, above the implementation detail of views and models
  MovieList.Controller = Marionette.Controller.extend({
    // Start the app by showing the appropriate views
    initialize: function () {
      // global events
      MoviesMVC.vent.on('query_received', this.onQueryReceived.bind(this));
      MoviesMVC.vent.on('results_received', this.renderSearchResults.bind(this));

      // Collections
      MoviesMVC.searchCollection = new MovieList.Models.SearchCollection();
      MoviesMVC.moviesCollection = new MovieList.Models.MovieCollection();

      this.elastiSearcher = new MovieList.ElasticSearcher();
      
      // LatestSearchesView
      this.latestSearchesView = new MovieList.Views.LatestSearchesView({
        collection: MoviesMVC.searchCollection
      });
      $('.rightMenu').prepend(this.latestSearchesView.el);

      // get DATA
      MoviesMVC.searchCollection.fetch({reset: true});

      // set current search
      if(MoviesMVC.searchCollection.length > 0){
        MoviesMVC.currentSearchModel = MoviesMVC.searchCollection.last();
      }
    },


    ////////////////
    // global events
    ////////////////
    onQueryReceived: function(query) {
      var router = MoviesMVC.router;
      router.navigate('movies/search/' + query, {trigger: true});
    },

    renderSearchResults: function(searchModel) {
      // set current search
      MoviesMVC.currentSearchModel = searchModel;
      
      // check if it is cached
      var searchModels = MoviesMVC.searchCollection.filter(function(item) {
        return item.get('query') === searchModel.get('query');
      });
      var isCached = (searchModels.length > 0);
      if(!isCached){
        MoviesMVC.searchCollection.add(searchModel);
      }

      // the view
      this.searchResultView = new MovieList.Views.SearchResultView({
        model: searchModel
      });

      App.main.show(this.searchResultView);
    },



    ////////////////
    // router methods
    ////////////////
    home: function() {
      var view = new MovieList.Views.HomeView();
      App.main.show(view);
    },

    imovies: function() {
      var view = new MovieList.Views.IMoviesView({
        collection: MoviesMVC.searchCollection
      });

      App.main.show(view);
    },

    movies: function() {
      this.onQueryReceived(MoviesMVC.currentSearchModel.get('query'));
    },

    goMovieSearch: function(query) {
      var searchModels = MoviesMVC.searchCollection.filter(function(item) {
        return item.get('query') === query;
      });
      
      var searchModelExists = (searchModels.length > 0);
      
      if(searchModelExists){
        //CACHED
        MoviesMVC.vent.trigger('results_received', searchModels[0]);
      }
      else{
        //REQUEST
        var asyncResult = this.elastiSearcher.searchElasticSearch(query);
        asyncResult.done(function(results) {
          this.getElasticSearchResult(query, results);
        }.bind(this));
      }
    },

    getElasticSearchResult: function(query, results) {
      // save search query
      var searchModel = new MovieList.Models.Search({
        query: query,
        results: results
      });

      MoviesMVC.vent.trigger('results_received', searchModel);
    },

    goMovieDetails: function(id) {
      // get from cache
      var movie = MoviesMVC.moviesCollection.get(id);
      
      if(!movie){
        //ASYNC
        this.elastiSearcher.getIdElasticSearch(id).done(function(result) {
          movie = new MovieList.Models.Movie(result);
          //cache
          MoviesMVC.moviesCollection.add(movie);
          this.renderMovieDetail(movie);
        }.bind(this));
      }
      else{
        this.renderMovieDetail(movie);
      }
    },

    renderMovieDetail: function(movie) {
      var view = new MovieList.Views.MovieDetailView({
        model: movie
      });

      App.main.show(view);
    },

    goMovieDetailThumb: function(id, thumbId) {
      // get from cache
      var movie = MoviesMVC.moviesCollection.get(id);
      
      if(!movie){
        //ASYNC
        this.elastiSearcher.getIdElasticSearch(id).done(function(result) {
          movie = new MovieList.Models.Movie(result);
          //cache
          MoviesMVC.moviesCollection.add(movie);
          this.renderMovieDetailThumb(movie, thumbId);
        }.bind(this));
      }
      else{
        this.renderMovieDetailThumb(movie, thumbId);
      }
    },

    renderMovieDetailThumb: function(movie, thumbId) {
      var view = new MovieList.Views.MovieDetailThumbView({
        model: movie,
        thumbId: thumbId
      });

      App.main.show(view);
    },

    about: function() {
      var view = new MovieList.Views.AboutView();

      App.main.show(view);
    },

  });

  // MovieList Initializer
  // --------------------
  MovieList.addInitializer(function () {
    startLogs();
    
    MoviesMVC.controller = new MovieList.Controller();
    MoviesMVC.router = new MovieList.Router({
      controller: MoviesMVC.controller
    });

    MoviesMVC.menuView = new MovieList.Views.MenuView({
      el: $('.mainMenu')[0]
    });

    MoviesMVC.searchInputView = new MovieList.Views.SearchInputView({
      el: $('#q')[0]
    });

  });

  function startLogs () {
    //__MELD_LOG('Handlebars', Handlebars.Compiler.prototype, 11);
    __MELD_LOG('MoviesMVC', Backbone.Marionette.Application.prototype, 10);
    __MELD_LOG('vent', MoviesMVC.vent, 12);
    __MELD_LOG('LocalStorage', Backbone.LocalStorage.prototype, 12);
    __MELD_LOG('ElasticSearcher', MovieList.ElasticSearcher.prototype, 12);

    __MELD_LOG('Controller', MovieList.Controller.prototype, 10);
    __MELD_LOG('Router', MovieList.Router.prototype, 11);
    
    __MELD_LOG('SearchCollection', MovieList.Models.SearchCollection.prototype, 3);
    __MELD_LOG('MovieCollection', MovieList.Models.MovieCollection.prototype, 3);

    __MELD_LOG('MenuView', MovieList.Views.MenuView.prototype, 21);
    __MELD_LOG('LatestSearchesView', MovieList.Views.LatestSearchesView.prototype, 20);
    __MELD_LOG('SearchInputView', MovieList.Views.SearchInputView.prototype, 20);
    __MELD_LOG('HomeView', MovieList.Views.HomeView.prototype, 21);
    __MELD_LOG('IMoviesView', MovieList.Views.IMoviesView.prototype, 22);
    __MELD_LOG('SearchResultView', MovieList.Views.SearchResultView.prototype, 22);
    __MELD_LOG('MovieDetailView', MovieList.Views.MovieDetailView.prototype, 22);
    __MELD_LOG('MovieDetailThumbView', MovieList.Views.MovieDetailThumbView.prototype, 22);
    __MELD_LOG('AboutView', MovieList.Views.AboutView.prototype, 21);

  }
});
