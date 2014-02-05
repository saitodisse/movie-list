/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette, $, _) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
      this.initializeMenu();
      this.initializeLayouts();
      this.initializeViews();
    },

    initializeMenu: function() {
      $("#changeLayoutLeft").on('click', function(e) {
        console.log(e)
        e.preventDefault();
        this.changeLayout('left');
      }.bind(this))

      $("#changeLayoutRight").on('click', function(e) {
        e.preventDefault();
        this.changeLayout('right');
      }.bind(this))
    },

    // initializeLayouts: function() {
    //   this.layouts = {};
    //   this.layouts.counter = 0;
    //   this.layouts.list = [
    //     ( new Base.Views.Layouts.OneColumn() ),
    //     ( new Base.Views.Layouts.TwoColumns() )
    //   ];
    //   this.layouts.current_layout = this.layouts[0];
    // },

    // initializeViews: function() {
    //   this.views = {};
    //   this.views.counter = 0;
    //   this.views.list = [
    //     ( new Base.Views.About() ),
    //     ( new Base.Views.IMovies() )
    //   ];
    //   this.views.current_view = this.views[0];
    // },

    // getNextLayout: function() {
    //   var index = this.layouts.counter % this.layouts.list.length;
    //   this.layouts.counter += 1;
    //   return this.layouts.list[index];
    // },

    // getNextView: function() {
    //   var index = this.views.counter % this.views.list.length;
    //   this.views.counter += 1;
    //   return this.views.list[index];
    // },

    // changeLayout: function(side) {
    //   var layout = this.getNextLayout();

    //   App.main.show(layout);

    //   layout.regionManager.each(function(region) {
    //     region.show(this.getNextView());
    //   }, this);
    // },





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
    }

  });

});
