$(function() {
  'use strict';

  window._app = {};
  
  var application = new MyApp.Application();
  
  window._app.application = application;
  __MELD_LOG('Application', window._app.application, 1);

  
  application.init();
});

