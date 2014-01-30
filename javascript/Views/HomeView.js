/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.HomeView = Marionette.ItemView.extend({
    template: '#home-template',
  });

});