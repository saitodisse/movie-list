/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette, $, _) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
      //EVENTS
      App.vent.on('new_layout', this.new_layout, this);
      
      this.layoutInit();
      this.initializeLayoutChanger();

      // App.vent.on('results_received', this.moviesViewInit, this);
      // App.vent.on('result_received', this.movieViewInit, this);
      //App.vent.on('movies_view_created', this.initializeLayoutChanger, this);

      // App.vent.on('movie_view_created', this.initializeLayoutChanger, this);

      this.movieViewInit();
      this.fetchMovie(1);

      // this.moviesViewInit();
      // this.fetchMovieCollection();
    },

    initializeMenu: function() {
      $("#changeLayoutLeft").on('click', function(e) {
        e.preventDefault();
        App.main.show(this.layoutChanger.getCurrentLayout());
        this.layoutChanger.getNextLeftView();
      }.bind(this))

      $("#changeLayoutRight").on('click', function(e) {
        e.preventDefault();
        App.main.show(this.layoutChanger.getCurrentLayout());
        this.layoutChanger.getNextRightView();
      }.bind(this))
    },

    new_layout: function(layout) {
      App.main.show(layout);
      App.vent.trigger('layout_showed');
    },

    initializeLayoutChanger: function() {
      var initialLayout = this.layoutChanger.getCurrentLayout();
      App.main.show(initialLayout);

      this.initializeMenu();

      // show first view
      App.main.show(this.layoutChanger.getCurrentLayout());
      this.layoutChanger.getNextLeftView();      
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


    fetchMovieCollection: function() {
      //DATA
      var searchModel = new Base.Models.Search({
        query: 'bolt'
      });
      
      var elastiSearcher = new Base.Helpers.ElasticSearcher();
      var asyncResult = elastiSearcher.searchElasticSearch(searchModel);
      asyncResult.done(function(results) {
        searchModel.set('results', results);
        App.vent.trigger('results_received', results);
      });

    },

    fetchMovie: function(id) {
      var elastiSearcher = new Base.Helpers.ElasticSearcher();
      var asyncResult = elastiSearcher.getIdElasticSearch(id);
      asyncResult.done(function(result) {
        //searchModel.set('result', result);
        App.vent.trigger('result_received', result);
      });
    },

    layoutInit: function() {
      //LAYOUTS
      this.layoutChanger = new App.Base.Helpers.LayoutChanger();
      this.layoutChanger.initialize();
      this.layoutChanger.addLayout(new App.Base.Views.Layouts.OneColumn());
      this.layoutChanger.addLayout(new App.Base.Views.Layouts.TwoColumns());
    },

    moviesViewInit: function(results) {
      var view;
      //DATA
      this.moviesCollection = new Base.Models.MovieCollection(results);
      
      //LAYOUTS
      var lc = this.layoutChanger = new App.Base.Helpers.LayoutChanger();
      lc.initialize();

      lc.addLayout(new App.Base.Views.Layouts.OneColumn());
      lc.addLayout(new App.Base.Views.Layouts.TwoColumns());

      // # Table #
      view = new Base.Views.Movies.Table.Movies({
        collection: this.moviesCollection
      });
      lc.addView(view);

      // # Thumb #
      view = new Base.Views.Movies.Thumb.Movies({
        collection: this.moviesCollection
      });
      lc.addView(view);
    
      lc.addView(null); // this will force a layout change

      App.vent.trigger('movies_view_created');
    },

    movieViewInit: function(result) {
      //DATA
      this.movie = new Base.Models.Movie(result);
      
      // # Detail #
      var view = new Base.Views.Movies.Detail.Movie({
        model: this.movie
      });
      this.layoutChanger.addView(view);
    
      App.vent.trigger('movie_view_created');
    }

  });

});
