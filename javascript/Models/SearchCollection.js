/*global MoviesMVC */

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone) {

  //search_localStorage
  MoviesMVC.searchCollection_localStorage = new Backbone.LocalStorage('MoviesMVC_SearchCollection');
  __MELD_LOG('search_localStorage', MoviesMVC.searchCollection_localStorage, 12);

  //SearchCollection
  Models.SearchCollection = Backbone.Collection.extend({
    model: Models.Search,

    localStorage: MoviesMVC.searchCollection_localStorage,

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
