/*global MoviesMVC */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.SearchInputView = Backbone.View.extend({
    initialize: function() {
      $(this.el).on('keyup', this.keyuped.bind(this));
      MoviesMVC.vent.on('results_received', this.results_received, this);
    },

    keyuped: function(e) {
      if(e.which === 13){
        var query = $(this.el).val();
        var latestQuery = MoviesMVC.controller.latestSearchesView.getLatest();
        if(query !== latestQuery){
          MoviesMVC.vent.trigger('query_received', query);
        }
      }
    },

    results_received: function(searchModel) {
      var input = $(this.el);
      input.val(searchModel.get('query'));
    }

  });

});