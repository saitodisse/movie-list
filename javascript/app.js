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
    window._app.router = router;
    __MELD_LOG('Router', window._app.router, 1);

    Backbone.history.start();
  };

})();