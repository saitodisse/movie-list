/*global App */

'use strict';
App.module('Base.Views.Movies.Table', function (Table, App, Backbone, Marionette, $) {

  Table.Movies = Marionette.CompositeView.extend({
    template: "movies/table/movies",
    
    itemViewContainer: "tbody",
    
    itemView: Table.Movie,

  });

});