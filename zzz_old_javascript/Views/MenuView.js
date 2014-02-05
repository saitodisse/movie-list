/*global App, Handlebars */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MenuView = Marionette.ItemView.extend({
    initialize: function() {
      var router = App.router;
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