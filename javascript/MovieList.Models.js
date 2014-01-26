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

  Models.SearchCollection = Backbone.Collection.extend({
    model: Models.Search
  });

});
