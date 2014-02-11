/*global App */

'use strict';
App.module('Base.Views.Movies.Thumb', function (Thumb, App, Backbone, Marionette, $) {

  Thumb.Movies = Marionette.CollectionView.extend({
    itemView: Thumb.Movie
  });

});