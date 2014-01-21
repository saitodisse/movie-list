(function() {
  'use strict';
  
  window.MyApp = {};

  MyApp.Application = function() {
  };

  MyApp.Application.prototype.init = function() {

    var jMenu = $('.mainMenu');
    var jMain = $('.main');

    //initialize router
    var router = new MyApp.Router({
      jMenu: jMenu
    });
    __MELD_LOG('MyApp.Router', router, 5);


    Backbone.history.start();
  };

})();