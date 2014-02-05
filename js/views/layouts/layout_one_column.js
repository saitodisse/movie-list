/*global App */

'use strict';
App.module('Base.Views.Layouts', function (Layouts, App, Backbone, Marionette) {

  Layouts.OneColumn = Marionette.Layout.extend({
    template: 'layouts/one_column',

    regions:{
      main: '#main'
    }
  });

});