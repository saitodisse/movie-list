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
      //this.initialize();
      App.router.navigate('movies/table/search/1/*:*', {trigger: true});
      // this.searchTable(1, "*:*")
    },

    searchTable: function(page, query) {
      this.moviesController.show();

      this.searchModel.set('resultViewType', 'table');
      this.getSearch(page, query);

      // App.main.show(this.searchLayout);

      // this.searchLayout.navigation.show(this.searchNavigationView);
      // this.searchLayout.result.show(this.tableView);
    },

    searchThumb: function(page, query) {
      this.searchModel.set('resultViewType', 'thumb');

      this.getSearch(page, query);

      App.main.show(this.searchLayout);
      this.searchLayout.navigation.show(this.searchNavigationView);

      this.searchLayout.result.show(this.thumbView);
    },

    getSearch: function(page, query) {
      this.searchModel.set({
        'query': query,
        'page': page}
      );
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

    updateUrl: function() {
      var newUrl = this.searchModel.getUrl();
      App.router.navigate(newUrl, {trigger: false});
    },

    fetchMovie: function(id) {
      var elastiSearcher = new Base.Helpers.ElasticSearcher();
      var asyncResult = elastiSearcher.getIdElasticSearch(id);
      asyncResult.done(function(result) {
        //searchModel.set('result', result);
        App.vent.trigger('result_received', result);
      });
    },

  });

});
