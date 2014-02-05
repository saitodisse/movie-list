/*global App */
'use strict';

App.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {

  Base.Layout = Marionette.Layout.extend({
    regions:{
      mainRegion: '.main',
      menuRegion: '.mainMenu'
    }
  });
  
});
