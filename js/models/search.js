/*global App*/

'use strict';
App.module('Base.Models', function (Models, App, Backbone) {

  Models.Search = Backbone.Model.extend({
    initialize: function(options) {
      
      this.set('page', options.page || 1);
      this.set('size', options.size || 10);
      this.set('sort', options.sort || 'imdbInfo.rating:desc');
    },

    previousPage: function() {
      var total = this.get('total');
      var offset = this.get('offset');
      var pageSize = this.get('size');

      var totalpages = Math.ceil(total/pageSize);
      var currentpage = offset/pageSize;

      if(currentpage>0){
        offset -= pageSize;
        this.set('offset', offset);
        App.vent.trigger('offset_changed', this);
      }

    },
    nextPage: function() {
      var total = this.get('total');
      var offset = this.get('offset');
      var pageSize = this.get('size');

      var totalpages = Math.ceil(total/pageSize);
      var currentpage = offset/pageSize;

      if(currentpage<totalpages-1){
        offset += pageSize;
        this.set('offset', offset);
        App.vent.trigger('offset_changed', this);
      }

    },

    hasResults: function() {
      var results = this.get('results');
      return (results && results.length > 0);
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
  });

});
