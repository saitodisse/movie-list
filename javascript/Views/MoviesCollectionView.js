/*global MoviesMVC */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MoviesCollectionView = Marionette.CollectionView.extend({
    itemView: Views.MovieView
  });

});