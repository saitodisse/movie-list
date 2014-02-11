/*global App, Handlebars */

'use strict';
App.module('Base.Views.Movies', function (Movies, App, Backbone, Marionette, $) {

  Movies.SearchNavigation = Marionette.ItemView.extend({
    template: 'movies/search-navigation',

    events:{
      'click .btnPrevPage': 'prevPage',
      'click .btnNextPage': 'nextPage'
    },

    prevPage: function() {
      App.vent.trigger('goPrevPage');
    },

    nextPage: function() {
      App.vent.trigger('goNextPage');
    },

  });
});