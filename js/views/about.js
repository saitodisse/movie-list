/*global App, Handlebars */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.About = Marionette.ItemView.extend({
    template: 'about',
  });

});