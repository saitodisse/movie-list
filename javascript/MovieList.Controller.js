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
      this.jMenu = $('.mainMenu');
      this.jMain = $('.main');

      this.jSearchInput = $('#q');

      // EVENTS
      MoviesMVC.vent.on('query_received', this.onQueryReceived.bind(this));
      MoviesMVC.vent.on('results_received', this.renderSearchResults.bind(this));
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

      // Suppresses 'add' events with {reset: true} and prevents the app view
      // from being re-rendered for every model. Only renders when the 'reset'
      // event is triggered at the end of the fetch.
      MoviesMVC.searchCollection.fetch({reset: true});

      // set current search
      if(MoviesMVC.searchCollection.length > 0){
        MoviesMVC.currentSearchModel = MoviesMVC.searchCollection.last();
      }
    },

    keyuped: function(e) {
      if(e.which === 13){
        var query = this.jSearchInput.val();
        var latestQuery = this.latestSearchesView.getLatest();
        if(query !== latestQuery){
          MoviesMVC.vent.trigger('query_received', query);
        }
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
      __MELD_LOG('SearchResultView', this.searchResultView, 4);
      this.searchResultView.render(searchModel.get('results'));

      // show results
      this.jMain.html(this.searchResultView.el);
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

    goIMovies: function() {
      this.setMenuActive('.imovie');

      var view = new MovieList.Views.IMoviesView({
        collection: MoviesMVC.searchCollection
      });
      __MELD_LOG('IMoviesView', view, 21);

      this.jMain.html(view.el);
    },

    goMovies: function() {
      this.onQueryReceived(MoviesMVC.currentSearchModel.get('query'));
    },

    goMovieSearch: function(query) {
      this.setMenuActive('.movies');

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

      //TODO: move this.jSearchInput to a separeted view
      this.jSearchInput.val(query);

      MoviesMVC.vent.trigger('results_received', searchModel);
    },

    goMovieDetails: function(id) {
      this.setMenuActive('.movies');

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
      __MELD_LOG('MovieDetailView', view, 21);
  
      this.jMain.html(view.el);
    },

    goMovieDetailThumb: function(id, thumbId) {
      this.setMenuActive('.movies');

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
      __MELD_LOG('MovieDetailThumbView', view, 22);

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
