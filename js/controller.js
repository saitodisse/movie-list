/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette, $, _) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
      // DATA: Collection
      this.moviesCollection = new Base.Models.MovieCollection();
      this.searchModel = new Base.Models.Search();

      // VIEW: Layout
      this.searchLayout = new Base.Views.Layouts.SearchLayout();

      // VIEW: ItemView
      this.searchNavigationView = new Base.Views.Movies.SearchNavigation({
        model: this.searchModel
      });
      // VIEW: CompositeView
      this.tableView = new Base.Views.Movies.Table.Movies({
        collection: this.moviesCollection
      });
      // VIEW: CollectionView
      this.thumbView = new Base.Views.Movies.Thumb.Movies({
        collection: this.moviesCollection
      });


      //EVENTS
      App.vent.on('goPrevPage', this.searchModel.previousPage, this.searchModel);
      App.vent.on('goNextPage', this.searchModel.nextPage, this.searchModel);
      
      this.searchModel.on('change:query', this.fetchMovieCollection, this);
      this.searchModel.on('change:query', this.updateUrl, this);
      this.searchModel.on('change:page', this.fetchMovieCollection, this);
      this.searchModel.on('change:page', this.updateUrl, this);


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

    searchTable: function(page, query) {
      this.searchModel.set('resultViewType', 'table');
      
      this.getSearch(page, query);

      App.main.show(this.searchLayout);
      this.searchLayout.navigation.show(this.searchNavigationView);

      this.searchLayout.result.show(this.tableView);
    },

    searchThumb: function(page, query) {
      this.searchModel.set('resultViewType', 'thumb');

      this.getSearch(page, query);

      App.main.show(this.searchLayout);
      this.searchLayout.navigation.show(this.searchNavigationView);

      this.searchLayout.result.show(this.thumbView);
    },

    getSearch: function(page, query) {
      
      this.searchModel.set('query', query);
      this.searchModel.set('page', page);

      this.fetchMovieCollection();
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

    moviesViewInit: function(results) {
      
      // # Table View #
      var view = new Base.Views.Movies.Table.Movies({
        collection: this.moviesCollection
      });
    },

    movieViewInit: function(result) {
      //DATA
      this.movie = new Base.Models.Movie(result);
      
      // # Detail #
      var view = new Base.Views.Movies.Detail.Movie({
        model: this.movie
      });
    },

  });

});
