/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone, Marionette, $) {

  Models.Movie = Backbone.Model.extend({
  });

  Models.MovieCollection = Backbone.Collection.extend({
    model: Models.Movie
  });


  Models.Search = Backbone.Model.extend({
  });

  Models.SearchCollection = Backbone.Collection.extend({
    model: Models.Search
  });

});
