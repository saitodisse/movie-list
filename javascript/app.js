(function() {
  'use strict';
  
  window.MyApp = {};

  MyApp.Application = function() {
  };

  MyApp.Application.prototype.init = function() {

    var jMenu = $('.mainMenu');
    var jMain = $('.main');

    //initialize router
    new MyApp.Router({
      jMenu: jMenu
    });

    Backbone.history.start();
  };

})();