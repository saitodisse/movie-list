/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette, $, _) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
      this.initializeMenu();
      this.initializeLayoutChanger();

      //EVENTS
      App.vent.on('new_layout', this.new_layout, this);
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
      var lc = this.layoutChanger = new App.Base.Helpers.LayoutChanger();
      lc.initialize();

      lc.addLayout(new App.Base.Views.Layouts.OneColumn());
      lc.addLayout(new App.Base.Views.Layouts.TwoColumns());

      lc.addView(App.Base.Views.IMovies);
      lc.addView(App.Base.Views.About);
      lc.addView(null); // this will force a layout change

      var initialLayout = lc.getCurrentLayout();
      App.main.show(initialLayout);
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
      //DATA
      var searchModel = new Base.Models.Search({
        query: 'bolt'
      });
      
      var elastiSearcher = new Base.Helpers.ElasticSearcher();
      var asyncResult = elastiSearcher.searchElasticSearch(searchModel);
      asyncResult.done(function(results) {
        
        var view = new Base.Views.MoviesCollection({
          collection: new Base.Models.MovieCollection(results)
        });

        App.main.show(view);

      }.bind(this));
    }

  });

});
