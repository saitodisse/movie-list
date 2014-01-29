/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.SearchResultView = Marionette.ItemView.extend({
    template: '#movies-template',

    events:{
      'click td': 'tdClicked'
    },

    tdClicked: function(e) {
      var jTd = $(e.target);
      var jTr = jTd.parent();
      var id = jTr.data('id');
      MoviesMVC.router.navigate('movies/' + id, {trigger: true});
    },

    render: function(jsonMovies) {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      var html = template({movies: jsonMovies});
      $(this.el).html(html);
    },

  });


});