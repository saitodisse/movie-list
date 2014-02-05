/*global App */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.SearchInputView = Marionette.ItemView.extend({
    initialize: function() {
      $(this.el).on('keyup', this.keyuped.bind(this));
      App.vent.on('results_received', this.results_received, this);
    },

    keyuped: function(e) {
      if(e.which === 13){
        var query = $(this.el).val();
        var latestQuery = App.controller.latestSearchesView.getLatest();
        if(query !== latestQuery){
          App.vent.trigger('query_received', query);
        }
      }
    },

    results_received: function(searchModel) {
      var input = $(this.el);
      input.val(searchModel.get('query'));
    }

  });

});