/*global App */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MoviesCollectionView = Marionette.CollectionView.extend({
    itemView: Views.MovieView
  });

});