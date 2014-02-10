/*global App */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MoviesCollection = Marionette.CollectionView.extend({
    itemView: Views.Movie
  });

});