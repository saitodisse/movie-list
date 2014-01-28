/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {

  MovieList.Layout = Marionette.Layout.extend({
    regions:{
      mainRegion: '.main',
      menuRegion: '.mainMenu'
    }
  });
  
});
