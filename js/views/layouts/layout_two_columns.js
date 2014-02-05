/*global App*/

'use strict';
App.module('Base.Views.Layouts', function (Layouts, App, Backbone, Marionette) {

  Layouts.TwoColumns = Marionette.Layout.extend({
    template: 'layouts/two_columns',

    regions:{
      left: '#left',
      right: '#right'
    }
  });

});