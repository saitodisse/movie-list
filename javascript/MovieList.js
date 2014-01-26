/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {
  // MovieList Router
  // ---------------
  //
  // Handle routes to show the active vs complete todo items
  MovieList.Router = Marionette.AppRouter.extend({
    appRoutes: {
      //'*filter': 'filterItems'
      '': 'goHome',
      'movies': 'goMovies',
      'movies/:id': 'goMovieDetails',
      'movies/:id/thumbs/:thumbId': 'goMovieDetailThumb',
      'about': 'goAbout'
    }
  });

  // MovieList Controller (Mediator)
  // ------------------------------
  //
  // Control the workflow and logic that exists at the application
  // level, above the implementation detail of views and models
  MovieList.Controller = function () {
  };

  _.extend(MovieList.Controller.prototype, {
    // Start the app by showing the appropriate views
    // and fetching the list of todo items, if there are any
    start: function () {
      this.jMenu = $('.mainMenu');
      this.jMain = $('.main');

      this.jSearchInput = $('#q');

      // EVENTS
      MoviesMVC.vent.on('search_queried', this.search_queried.bind(this));
      this.jSearchInput.on('keyup', this.keyuped.bind(this));

      // LatestSearchesView
      this.jRightMenu = $('.rightMenu');

      // SearchCollection
      MoviesMVC.searchCollection = new MovieList.Models.SearchCollection();
      __MELD_LOG('SearchCollection', MoviesMVC.searchCollection, 3);
      
      // LatestSearchesView
      this.latestSearchesView = new MovieList.Views.LatestSearchesView({
        collection: MoviesMVC.searchCollection
      });
      __MELD_LOG('LatestSearchesView', this.latestSearchesView, 4);
      this.jRightMenu.prepend(this.latestSearchesView.el);

      MoviesMVC.moviesCollection = new MovieList.Models.MovieCollection();
      __MELD_LOG('MovieCollection', MoviesMVC.moviesCollection, 3);

      // do the first search
      MoviesMVC.vent.trigger('search_queried', 'year:(2013)');

    },

    keyuped: function(e) {
      if(e.which === 13){
        var query = this.jSearchInput.val();
        var latestQuery = this.latestSearchesView.getLatest();
        if(query !== latestQuery){
          MoviesMVC.vent.trigger('search_queried', query);
        }
      }
    },

    search_queried: function(query, cachedResults) {
      if(typeof cachedResults === 'undefined'){
        // query elastic search 
        this.searchElasticSearch(query).done(function(results) {
          // save search query
          var searchModel = new MovieList.Models.Search({
            id: query,    // this prevents repetions
            query: query,
            results: results
          })
          
          MoviesMVC.searchCollection.add(searchModel);
          MoviesMVC.searchCollection.trigger('searched', searchModel);

          MoviesMVC.currentSearch = searchModel;

          // post search
          this.jSearchInput.val(query);

          this.renderSearchResults(results);
        }.bind(this));
      }
      else{
        this.renderSearchResults(cachedResults);
      }
    },

    renderSearchResults: function(results) {
      // render search results
      this.searchResultView = new MovieList.Views.SearchResultView();
      __MELD_LOG('SearchResultView', this.searchResultView, 4);
      this.searchResultView.render(results);

      // show results
      this.goMovies(this.searchResultView);
    },

    setMenuActive: function(menuClass) {
      this.jMenu.find('li').removeClass('active');
      var jHomeMenu = this.jMenu.find(menuClass);
      jHomeMenu.addClass('active');
    },

    goHome: function() {
      this.setMenuActive('.home');

      var view = new MovieList.Views.HomeView();
      __MELD_LOG('HomeView', view, 20);

      this.jMain.html(view.el);
    },

    goMovies: function(view) {
      this.setMenuActive('.movies');

      if(view){
        this.jMain.html(view.el);
      }
      else{
        var currentSearch = MoviesMVC.currentSearch;
        if(currentSearch){
          var currentQuery = currentSearch.get('query');
          var results = currentSearch.get('results');
          MoviesMVC.vent.trigger('search_queried', currentQuery, results);
        }
      }

    },

    goMovieDetails: function(id) {
      this.setMenuActive('.movies');
      this.getIdElasticSearch(id).done(function(result) {

          var movie = new MovieList.Models.Movie(result);
          MoviesMVC.moviesCollection.add(movie);

          var view = new MovieList.Views.MovieDetailView({
            model: movie
          });
          __MELD_LOG('MovieDetailView', view, 21);
          this.jMain.html(view.el);

        }.bind(this))
      ;
    },

    goMovieDetailThumb: function(id, thumbId) {
      this.setMenuActive('.movies');

      var view = new MovieList.Views.MovieDetailThumbView({
        model: MoviesMVC.moviesCollection.get(id),
        thumbId: thumbId
      });
      __MELD_LOG('MovieDetailView', view, 21);

      this.jMain.html(view.el);
    },

    goAbout: function() {
      this.setMenuActive('.about');

      var view = new MovieList.Views.AboutView();
      __MELD_LOG('AboutView', view, 22);

      this.jMain.html(view.el);
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
          };
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
    var controller = new MovieList.Controller();
    __MELD_LOG('Controller', controller, 11);

    controller.router = new MovieList.Router({
      controller: controller
    });
    __MELD_LOG('Router', controller.router, 12);

    controller.start();

    MoviesMVC.controller = controller;
  });
});
