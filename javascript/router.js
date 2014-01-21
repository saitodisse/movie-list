'use strict';
(function() {
  
  MyApp.Router = Backbone.Router.extend({
    routes: {
      '': 'showHomePage',
      'search': 'showSearchPage',
      'about': 'showAboutPage'
    },

    initialize: function(options) {
      this.jMenu = options.jMenu;
    },

    showHomePage: function() {
      this.jMenu.find('li').removeClass('active');
      var jHomeMenu = this.jMenu.find('.home');
      jHomeMenu.addClass('active');
    },

    showSearchPage: function() {
      this.jMenu.find('li').removeClass('active');
      var jSearchMenu = this.jMenu.find('.search');
      jSearchMenu.addClass('active');
    },

    showAboutPage: function() {
      this.jMenu.find('li').removeClass('active');
      var jAboutMenu = this.jMenu.find('.about');
      jAboutMenu.addClass('active');
    }
  });

})();