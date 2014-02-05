/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette, $, _) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
      $("#changeLayout").on('click', function() {
        this.changeLayout();
      }.bind(this))
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

    changeLayout: function(e) {

      //e.preventDefault();
      this.counter = this.counter || 0;
      this.layouts = [
        ( new Base.Views.Layouts.OneColumn() ),
        ( new Base.Views.Layouts.TwoColumns() )
      ];
      this.current_layout = this.layouts[this.counter % 2];
      this.counter += 1;

      // this.views = [];
      // this.views.push(new Base.Views.About());
      // this.views.push(new Base.Views.IMovies());
      // this.about_view = new Base.Views.About();

      App.main.show(this.current_layout);

      App.controller.current_layout.regionManager.each(function(region) {
        region.show(new Base.Views.About());
      }, this);
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
