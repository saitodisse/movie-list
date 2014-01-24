/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone, Marionette, $) {

  Models.Movie = Backbone.Model.extend({
  });

  Models.MovieCollection = Backbone.Collection.extend({
    model: Models.Movie
  });

});
