/*global App */
'use strict';

App.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {

  // MovieList Controller (Mediator)
  // ------------------------------
  //
  // Control the workflow and logic that exists at the application
  // level, above the implementation detail of views and models
  Base.Controller = Marionette.Controller.extend({
    // Start the app by showing the appropriate views
    initialize: function () {
      // global events
      App.vent.on('query_received', this.onQueryReceived, this);
      App.vent.on('results_received', this.renderSearchResults, this);
      App.vent.on('offset_changed', this.offset_changed, this)

      App.vent.on('goPrevPage', this.goPrevPage, this);
      App.vent.on('goNextPage', this.goNextPage, this);

      // Collections
      App.searchCollection = new Base.Models.SearchCollection();
      App.moviesCollection = new Base.Models.MovieCollection();

      this.elastiSearcher = new Base.ElasticSearcher();
      
      // LatestSearchesView
      this.latestSearchesView = new Base.Views.LatestSearchesView({
        collection: App.searchCollection
      });
      $('.rightMenu').prepend(this.latestSearchesView.render().el);

      // get DATA
      App.searchCollection.fetch({reset: true});

      // set current search
      if(App.searchCollection.length > 0){
        App.currentSearchModel = App.searchCollection.last();
      }
    },

    ////////////////
    // global events
    ////////////////
    onQueryReceived: function(query) {
      if(query === '*'){
        query = '*:*';
      }
      var router = App.router;
      router.navigate('movies/search/' + query, {trigger: true});
    },

    renderSearchResults: function(searchModel) {
      // set current search
      App.currentSearchModel = searchModel;
      
      // check if it is cached
      // var searchModels = App.searchCollection.filter(function(item) {
      //   return item.get('query') === searchModel.get('query');
      // });
      var isCached = false;//(searchModels.length > 0);
      if(!isCached){
        App.searchCollection.add(searchModel);
      }

      searchModel.setSelectedResult(App.moviesCollection.getCurrentMovie());

      var view;
      if(App.showThumbsSearch){
        view = new Base.Views.SearchResultView({
          model: searchModel,
          template: 'moviesThumb'
        });
      }
      else{
        view = new Base.Views.SearchResultView({
          model: searchModel,
          template: 'movies'
        });
      }

      App.main.show(view);
    },



    ////////////////
    // router methods
    ////////////////
    imovies: function() {
      var view = new Base.Views.IMoviesView({
        collection: App.searchCollection
      });

      App.main.show(view);
    },

    goPrevPage: function() {
      var searchModel = App.currentSearchModel;
      searchModel.previousPage();
    },

    goNextPage: function() {
      var searchModel = App.currentSearchModel;
      searchModel.nextPage();
    },

    offset_changed: function(searchModel) {
      var asyncResult = this.elastiSearcher.searchElasticSearch(searchModel);
      asyncResult.done(function(results) {
        searchModel.set('results', results);
        this.getElasticSearchResult(searchModel);
      }.bind(this));
    },


    movies: function() {
      this.onQueryReceived(App.currentSearchModel.get('query'));
    },

    goMovieSearch: function(query) {
      var searchModels = App.searchCollection.filter(function(item) {
        return item.get('query') === query;
      });
      
      var searchModelExists = (searchModels.length > 0);
      
      if(searchModelExists){
        //CACHED
        App.vent.trigger('results_received', searchModels[0]);
      }
      else{
        //REQUEST
        var searchModel = new Base.Models.Search({
          query: query
        });
        var asyncResult = this.elastiSearcher.searchElasticSearch(searchModel);
        asyncResult.done(function(results) {
          searchModel.set('results', results);
          this.getElasticSearchResult(searchModel);
        }.bind(this));
      }
    },

    getElasticSearchResult: function(searchModel) {
      App.vent.trigger('results_received', searchModel);
    },

    goMovieDetails: function(id) {
      // get from cache
      var movie = App.moviesCollection.get(id);
      
      if(!movie){
        //ASYNC
        this.elastiSearcher.getIdElasticSearch(id).done(function(result) {
          movie = new Base.Models.Movie(result);
          //cache
          App.moviesCollection.add(movie);
          App.moviesCollection.setCurrentMovie(movie);
          //render
          this.renderMovieDetail(movie);
        }.bind(this));
      }
      else{
        App.moviesCollection.setCurrentMovie(movie);
        this.renderMovieDetail(movie);
      }
    },

    renderMovieDetail: function(movie) {
      var view = new Base.Views.MovieDetailView({
        model: movie
      });

      App.main.show(view);
    },

    goMovieDetailThumb: function(id, thumbId) {
      // get from cache
      var movie = App.moviesCollection.get(id);
      
      if(!movie){
        //ASYNC
        this.elastiSearcher.getIdElasticSearch(id).done(function(result) {
          movie = new Base.Models.Movie(result);
          //cache
          App.moviesCollection.add(movie);
          this.renderMovieDetailThumb(movie, thumbId);
        }.bind(this));
      }
      else{
        this.renderMovieDetailThumb(movie, thumbId);
      }
    },

    renderMovieDetailThumb: function(movie, thumbId) {
      var view = new Base.Views.MovieDetailThumbView({
        model: movie,
        thumbId: thumbId
      });

      App.main.show(view);
    },

    about: function() {
      var view = new Base.Views.AboutView();

      App.main.show(view);
    },

    moviesRealCollection: function() {
      //DATA
      var searchModel = App.currentSearchModel;
      
      var asyncResult = this.elastiSearcher.searchElasticSearch(searchModel);
      asyncResult.done(function(results) {
        
        var view = new Base.Views.MoviesCollectionView({
          collection: new Base.Models.MovieCollection(results)
        });

        App.main.show(view);

      }.bind(this));
    },

  });

  // MovieList Initializer
  // --------------------
  Base.addInitializer(function () {
    startLogs();
    
    App.controller = new Base.Controller();
    App.router = new Base.Router({
      controller: App.controller
    });

    App.menuView = new Base.Views.MenuView({
      el: $('.mainMenu')[0]
    });

    App.searchInputView = new Base.Views.SearchInputView({
      el: $('#q')[0]
    });

  });

  function startLogs () {
    //__MELD_LOG('Handlebars', Handlebars.Compiler.prototype, 11);
    __MELD_LOG('App', Backbone.Marionette.Application.prototype, 10);
    __MELD_LOG('vent', App.vent, 12);
    // __MELD_LOG('LocalStorage', Backbone.LocalStorage.prototype, 12);
    // __MELD_LOG('ElasticSearcher', Base.ElasticSearcher.prototype, 12);

    __MELD_LOG('Controller', Base.Controller.prototype, 10);
    // __MELD_LOG('Router', Base.Router.prototype, 11);
    
    // __MELD_LOG('Movie', Base.Models.Movie.prototype, 3);
    // __MELD_LOG('MovieCollection', Base.Models.MovieCollection.prototype, 3);
    // __MELD_LOG('Search', Base.Models.Search.prototype, 3);
    // __MELD_LOG('SearchCollection', Base.Models.SearchCollection.prototype, 3);

    // __MELD_LOG('MenuView', Base.Views.MenuView.prototype, 21);
    // __MELD_LOG('LatestSearchesView', Base.Views.LatestSearchesView.prototype, 20);
    // __MELD_LOG('SearchInputView', Base.Views.SearchInputView.prototype, 20);
    // __MELD_LOG('IMoviesView', Base.Views.IMoviesView.prototype, 22);
    // __MELD_LOG('SearchResultView', Base.Views.SearchResultView.prototype, 22);
    // __MELD_LOG('MovieDetailView', Base.Views.MovieDetailView.prototype, 22);
    // __MELD_LOG('MovieDetailThumbView', Base.Views.MovieDetailThumbView.prototype, 22);
    // __MELD_LOG('AboutView', Base.Views.AboutView.prototype, 21);

  }
});
