/*global App */

'use strict';
App.module('Base.Views.Movies.Detail', function (Detail, App, Backbone, Marionette, $) {

  Detail.Movie = Marionette.ItemView.extend({
    template: 'movies/detail/movie',

    events:{
      'click .btn-back-to-list': 'backToList',
    },

    initialize: function() {
      if(typeof this.model === 'undefined'){
        return;
      }
      window.scrollTo(0,1);
    },

    backToList: function() {
      var newUrl = App.controller.searchModel.getUrl();
      App.router.navigate(newUrl, {trigger: true});
    },

  });

});