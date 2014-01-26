/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone, Marionette, $) {

  Models.Movie = Backbone.Model.extend({
  });

  Models.MovieCollection = Backbone.Collection.extend({
    model: Models.Movie
  });


  Models.Search = Backbone.Model.extend({
    hasResults: function() {
      var results = this.get('results');
      return (results && results.length > 0)
    }
  });

  MoviesMVC.searchCollection_localStorage = new Backbone.LocalStorage("MoviesMVC_SearchCollection");
  __MELD_LOG('search_localStorage', MoviesMVC.searchCollection_localStorage, 12);


  Models.SearchCollection = Backbone.Collection.extend({
    model: Models.Search,

    localStorage: MoviesMVC.searchCollection_localStorage,

    initialize: function() {
      this.on('add', this.checkCollectionOverflow, this)
    },

    checkCollectionOverflow: function() {
      if(this.length > 5){
        this.first().destroy();
      }
    }
  });

});
