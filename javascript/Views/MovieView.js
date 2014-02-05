/*global MoviesMVC */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MovieView = Marionette.ItemView.extend({
    template: 'movie'
  });

});