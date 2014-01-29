/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {

  // MovieList Controller (Mediator)
  // ------------------------------
  //
  // Control the workflow and logic that exists at the application
  // level, above the implementation detail of views and models
  MovieList.Controller = function () {
  };

  _.extend(MovieList.Controller.prototype, {
    // Start the app by showing the appropriate views
    start: function () {
      // EVENTS
      MoviesMVC.vent.on('query_received', this.onQueryReceived.bind(this));
      MoviesMVC.vent.on('results_received', this.renderSearchResults.bind(this));

      // LatestSearchesView
      this.jRightMenu = $('.rightMenu');

      // SearchCollection
      MoviesMVC.searchCollection = new MovieList.Models.SearchCollection();
      
      // LatestSearchesView
      this.latestSearchesView = new MovieList.Views.LatestSearchesView({
        collection: MoviesMVC.searchCollection
      });

      this.jRightMenu.prepend(this.latestSearchesView.el);

      MoviesMVC.moviesCollection = new MovieList.Models.MovieCollection();

      // Suppresses 'add' events with {reset: true} and prevents the app view
      // from being re-rendered for every model. Only renders when the 'reset'
      // event is triggered at the end of the fetch.
      MoviesMVC.searchCollection.fetch({reset: true});

      // set current search
      if(MoviesMVC.searchCollection.length > 0){
        MoviesMVC.currentSearchModel = MoviesMVC.searchCollection.last();
      }
    },

    onQueryReceived: function(query) {
      var router = MoviesMVC.controller.router;
      router.navigate('movies/search/' + query, {trigger: true});
    },

    renderSearchResults: function(searchModel) {
      // set current search
      MoviesMVC.currentSearchModel = searchModel;
      
      var searchModels = MoviesMVC.searchCollection.filter(function(item) {
        return item.get('query') === searchModel.get('query');
      });

      var searchModelCached = (searchModels.length > 0);
      if(!searchModelCached){
        MoviesMVC.searchCollection.add(searchModel);
      }

      // render search results
      this.searchResultView = new MovieList.Views.SearchResultView();
      this.searchResultView.render(searchModel.get('results'));

      // show results
      App.main.close();
      // TODO: how can a change this??
      $('.main').html(this.searchResultView.el);
    },

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
        var asyncResult = this.searchElasticSearch(query);
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
        this.getIdElasticSearch(id).done(function(result) {
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
        this.getIdElasticSearch(id).done(function(result) {
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

    searchElasticSearch: function(query) {
      var def = $.Deferred();

      var data = {
          size: 500,
          sort: 'imdbInfo.rating:desc',
          q: query
        };

      $.ajax({
        url: 'http://localhost:9200/movies/movie/_search',
        data: data,
        //data: data,
        success: function(data) {
          var resultsProcessor = new MoviesMVC.ResultsProcessor.Processor();
          var results = [];
          for (var i = 0; i < data.hits.hits.length; i++) {
            var hit = data.hits.hits[i];
            var movieSimplified = resultsProcessor.simplify(hit._source);
            results.push(movieSimplified);
          }
          def.resolve(results);
        },
        dataType: 'json'
      });
      return def.promise();
    },

    getIdElasticSearch: function(id) {
      var def = $.Deferred();

      $.ajax({
        url: 'http://localhost:9200/movies/movie/' + id,
        success: function(data) {
          def.resolve(data._source);
        },
        dataType: 'json'
      });
      return def.promise();
    }

  });

  // MovieList Initializer
  // --------------------
  //
  // Get the MovieList up and running by initializing the mediator
  // when the the application is started, pulling in all of the
  // existing Todo items and displaying them.
  MovieList.addInitializer(function () {
    startLogs();
    
    var controller = new MovieList.Controller();
    MoviesMVC.controller = controller;

    controller.router = new MovieList.Router({
      controller: controller
    });

    controller.menuView = new MovieList.Views.MenuView({
      el: $('.mainMenu')[0]
    });

    controller.searchInputView = new MovieList.Views.SearchInputView({
      el: $('#q')[0]
    });

    controller.start();
  });

  function startLogs () {
    __MELD_LOG('MoviesMVC', Backbone.Marionette.Application.prototype, 10);
    __MELD_LOG('vent', MoviesMVC.vent, 12);
    __MELD_LOG('LocalStorage', Backbone.LocalStorage.prototype, 12);

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
