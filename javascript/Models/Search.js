/*global MoviesMVC*/

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone) {

  Models.Search = Backbone.Model.extend({
    hasResults: function() {
      var results = this.get('results');
      return (results && results.length > 0);
    },

    setSelectedResult: function(movie) {
      if(movie){
        console.log('last movie selected:', movie.get('title'));
        
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
