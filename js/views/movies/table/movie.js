/*global App */

'use strict';
App.module('Base.Views.Movies.Table', function (Table, App, Backbone, Marionette, $) {

  Table.Movie = Marionette.ItemView.extend({
    template: 'movies/table/movie',

    tagName: "tr"
  });

});