/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
      // get data
      this.moviesCollection = new Base.Models.MovieCollection();
      this.searchModel = new Base.Models.Search();

      //EVENTS
      App.vent.on('goPrevPage', this.searchModel.previousPage, this.searchModel);
      App.vent.on('goNextPage', this.searchModel.nextPage, this.searchModel);
      
      this.searchModel.on('change:query', this.fetchMovieCollection, this);
      this.searchModel.on('change:query', this.updateUrl, this);
      this.searchModel.on('change:page', this.fetchMovieCollection, this);
      this.searchModel.on('change:page', this.updateUrl, this);

      // movies controller
      this.moviesController = new Base.MoviesController({
        mainRegion: App.main,
        moviesCollection: this.moviesCollection,
        searchModel: this.searchModel
      });
    },

    ////////////////
    // router methods
    ////////////////
    imovies: function() {
      var view = new Base.Views.IMovies();
      App.main.show(view);
    },

    about: function() {
      var view = new Base.Views.About();
      App.main.show(view);
    },

    allMovies: function() {
      App.router.navigate('movies/table/search/1/*:*', {trigger: true});
    },

    searchTable: function(page, query) {
      this.moviesController.show();

      this.searchModel.set('currentView', 'table');
      this.getSearch(page, query);
    },

    searchThumb: function(page, query) {
      this.moviesController.show();

      this.searchModel.set('currentView', 'thumb');
      this.getSearch(page, query);
    },


    /*
        Movie Details
     */
    goMovieDetails: function(id) {
      this.fetchMovie(id).then(this.showMovieDetail.bind(this));
    },
    showMovieDetail: function( data ) {
      this.currentMovie = new Base.Models.Movie( data );

      //Detail
      this.movieDetailView = new Base.Views.Movies.Detail.Movie({
        model: this.currentMovie
      });

      App.main.show(this.movieDetailView);
    },

    /*
        Movie Details Thumbs
     */
    goMovieDetailThumb: function(id, thumbId) {
      this.currentThumbId = thumbId;
      this.fetchMovie(id).then(this.showMovieDetailThumb.bind(this));
    },
    showMovieDetailThumb: function(data) {
      this.currentMovie = new Base.Models.Movie( data );

      this.movieDetailThumbsView = new Base.Views.Movies.Detail.MovieThumbs({
        model: this.currentMovie,
        thumbId: this.currentThumbId
      });
      
      App.main.show(this.movieDetailThumbsView);
    },    

    getSearch: function(page, query) {
      this.searchModel.set({'page':page}, {silent:true});
      this.searchModel.set({'query': query});
    },


    fetchMovieCollection: function() {
      //DATA
      var elastiSearcher = new Base.Helpers.ElasticSearcher();

      var promise = elastiSearcher.searchElasticSearch(this.searchModel);

      promise.then(
        //SUCCESS
        function(data) {
          this.moviesCollection.reset(data);
          App.vent.trigger('search_fetched', data);
        }.bind(this),

        //ERROR
        function(err) {
          App.vent.trigger('ERROR in searchElasticSearch', err);
        }
      );
      
      ///////////////////////////////////////////////////////////////
      // this error will be catch at "  RSVP.on('error'  " on app.js
      // so we dont have to set the line below:

      // .catch(function(err) {
      //   App.vent.trigger('ERROR in fetchMovieCollection', err);
      // });
      ///////////////////////////////////////////////////////////////

      return promise;
    },
    fetchMovie: function(id) {
      //DATA
      var elastiSearcher = new Base.Helpers.ElasticSearcher();

      var promise = elastiSearcher.getIdElasticSearch(id);

      promise.then(
        //SUCCESS
        function(data) {
          App.vent.trigger('movie_fetched', data);
        }.bind(this),

        //ERROR
        function(err) {
          App.vent.trigger('ERROR in searchElasticSearch', err);
        }
      );

      return promise;
    },

    updateUrl: function() {
      var newUrl = this.searchModel.getUrl();
      App.router.navigate(newUrl, {trigger: false});
    },


  });

});
