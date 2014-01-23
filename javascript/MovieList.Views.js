/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {
  Views.SearchView = Backbone.View.extend({
    template: '#search-template',

    events: {
      'keyup .q': 'keyuped'
    },

    initialize: function() {
      this.render();
    },

    keyuped: function(e) {
      if(e.which === 13){
        this.jQ = this.$('.q');
        MoviesMVC.trigger('movie_searched', this.jQ.val());
        this.jQ.val('');
      }
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    }
  });

  Views.HomeView = Backbone.View.extend({
    template: '#home-template',

    initialize: function() {
      this.render();
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    }
  });

  Views.AboutView = Backbone.View.extend({
    template: '#about-template',

    initialize: function() {
      this.render();
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    }
  });

});
