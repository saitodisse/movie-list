/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MenuView = Backbone.View.extend({
    initialize: function() {
      var router = MoviesMVC.controller.router;
      router.on('route', this.setMenuActive, this);
    },

    setMenuActive: function(menuClass) {
      $(this.el).find('li').removeClass('active');
      var jHomeMenu = $(this.el).find('.' + menuClass);
      if(jHomeMenu.length > 0){
        jHomeMenu.addClass('active');
      }
    },

  });

});