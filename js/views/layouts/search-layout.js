/*global App */

'use strict';
App.module('Base.Views.Layouts', function (Layouts, App, Backbone, Marionette) {

  Layouts.SearchLayout = Marionette.Layout.extend({
    template: 'layouts/search',

    regions:{
      navigation: '#search-navigation',
      result: '#search-result'
    }
  });

});