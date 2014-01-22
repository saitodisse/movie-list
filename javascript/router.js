'use strict';
(function() {
  
  MyApp.Router = Backbone.Router.extend({
    routes: {
      '': 'goHome',
      'search': 'goSearch',
      'about': 'goAbout'
    },

    initialize: function(options) {
      this.jMenu = options.jMenu;
    },

    goHome: function() {
      this.jMenu.find('li').removeClass('active');
      var jHomeMenu = this.jMenu.find('.home');
      jHomeMenu.addClass('active');

      var source   = $("#home-template").html();
      var template = Handlebars.compile(source);
      $('.main').html(template);
    },

    goSearch: function() {
      this.jMenu.find('li').removeClass('active');
      var jSearchMenu = this.jMenu.find('.search');
      jSearchMenu.addClass('active');

      var source   = $("#search-template").html();
      var template = Handlebars.compile(source);
      $('.main').html(template);
    },

    goAbout: function() {
      this.jMenu.find('li').removeClass('active');
      var jAboutMenu = this.jMenu.find('.about');
      jAboutMenu.addClass('active');

      var source   = $("#about-template").html();
      var template = Handlebars.compile(source);
      $('.main').html(template);
    }
  });



})();