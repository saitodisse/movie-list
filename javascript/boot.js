$(function() {
  'use strict';
  
  var app = new MyApp.Application();
  __MELD_LOG('MyApp.Application', app, 1);

  app.init();

  window._app = app;
});

