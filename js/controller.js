/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette, $, _) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
      // DATA: Collection
      this.moviesCollection = new Base.Models.MovieCollection();

      // VIEW: CompositeView
      this.tableView = new Base.Views.Movies.Table.Movies({
        collection: this.moviesCollection
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

    movies: function() {
      if(this.moviesCollection.models.length === 0){
        this.fetchMovieCollection("*:*");
      }

      App.main.show(this.tableView);
    },


    fetchMovieCollection: function(query) {
      //DATA
      var searchModel = new Base.Models.Search({
        query: query
      });
      
      var elastiSearcher = new Base.Helpers.ElasticSearcher();

      var promise = elastiSearcher.searchElasticSearch(searchModel);

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
    }

  });

});
