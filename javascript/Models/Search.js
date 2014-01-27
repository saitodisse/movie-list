/*global MoviesMVC*/

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone) {

  Models.Search = Backbone.Model.extend({
    hasResults: function() {
      var results = this.get('results');
      return (results && results.length > 0);
    }
  });

});
