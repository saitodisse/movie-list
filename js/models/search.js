/*global App*/

'use strict';
App.module('Base.Models', function (Models, App, Backbone) {

  Models.Search = Backbone.Model.extend({
    initialize: function(options) {
      if(options){
        this.set('page', options.page || 1);
        this.set('size', options.size || 12);
        this.set('sort', options.sort || 'imdbInfo.rating:desc');
      }
      else{
        this.set('page', 1);
        this.set('size', 12);
        this.set('sort', 'imdbInfo.rating:desc');
        this.set('totalPages', this.totalPages.bind(this));
      }
    },

    previousPage: function() {
      var currentPage = this.get('page');
      if(currentPage > 1){
        this.set('page', --currentPage);
      }
    },
    nextPage: function() {
      var total = this.get('total');
      var pageSize = this.get('size');
      var currentPage = this.get('page');

      var totalpages = Math.ceil(total/pageSize);
      if(currentPage < totalpages){
        this.set('page', ++currentPage);
      }
    },

    hasResults: function() {
      var results = this.get('results');
      return (results && results.length > 0);
    },

    totalPages: function() {
      var total = this.get('total');
      var pageSize = this.get('size');
      var totalpages = Math.ceil(total/pageSize);

      return totalpages;
    },

    setSelectedResult: function(movie) {
      if(movie){
        if(this.hasResults()){
          var results = this.get('results');
          var selectedResult = _.find(results, function(result){
            return result.id === movie.id
          });
          this.selectedResult = selectedResult;
        }
      }
    },

    getSelectedResult: function() {
      if(this.selectedResult){
        return this.selectedResult;
      }
    },

    getUrl: function() {
      var url = "movies/";
      url += this.get('currentView');
      url += "/search/";
      url += this.get('page');
      url += "/";
      url += this.get('query');
      return url;
    }

  });

});
