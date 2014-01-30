/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.AboutView = Marionette.ItemView.extend({
    template: 'about',
  });

});