/*global App */

'use strict';
App.module('Base.Models', function (Models, App, Backbone) {

  //search_localStorage
  App.searchCollection_localStorage = new Backbone.LocalStorage('App_SearchCollection');

  //SearchCollection
  Models.SearchCollection = Backbone.Collection.extend({
    model: Models.Search,

    localStorage: App.searchCollection_localStorage,

    initialize: function() {
      this.on('add', this.checkCollectionOverflow, this);
    },

    checkCollectionOverflow: function() {
      if(this.length > 5){
        this.first().destroy();
      }
    }
  });

});
