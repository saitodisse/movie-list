/*global App */
'use strict';

App.module('Base', function (Base, App, Backbone, Marionette, $, _) {

  Base.Controller = Marionette.Controller.extend({

    initialize: function () {
    },


    ////////////////
    // router methods
    ////////////////
    imovies: function() {
      var view = new Base.Views.IMovies();
      App.left.show(view);
    },

    about: function() {
      var view = new Base.Views.About();
      App.right.show(view);
    },

    changeLayout: function() {
      App.left.show(new Base.Views.About());
      App.right.show(new Base.Views.IMovies());
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
