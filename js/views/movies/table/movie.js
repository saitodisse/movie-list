/*global App */

'use strict';
App.module('Base.Views.Movies.Table', function (Table, App, Backbone, Marionette, $) {

  Table.Movie = Marionette.ItemView.extend({
    template: 'movies/table/movie',

    tagName: "tr",

    events:{
      'click td': 'tdClicked'
    },

    tdClicked: function(e) {
      var jTd = $(e.target);
      var jTr = jTd.parent();

      // the ID is on the first column
      var id = jTr.find('td:eq(0)').data('id');
      
      App.router.navigate('movies/' + id, {trigger: true});
    },

  });

});