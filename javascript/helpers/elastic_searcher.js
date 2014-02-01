/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette) {

  MovieList.ElasticSearcher = function(){};

  _.extend(MovieList.ElasticSearcher.prototype, {

    searchElasticSearch: function(query) {
      var def = $.Deferred();

      var data = {
          size: 500,
          sort: 'imdbInfo.rating:desc',
          q: query
        };

      $.ajax({
        url: 'http://localhost:9200/movies/movie/_search',
        data: data,
        //data: data,
        success: function(data) {
          var results = [];
          for (var i = 0; i < data.hits.hits.length; i++) {
            var hit = data.hits.hits[i];
            var movieSimplified = this.simplify(hit._source);
            results.push(movieSimplified);
          }
          def.resolve(results);
        }.bind(this),
        dataType: 'json'
      });
      return def.promise();
    },

    getIdElasticSearch: function(id) {
      var def = $.Deferred();

      $.ajax({
        url: 'http://localhost:9200/movies/movie/' + id,
        success: function(data) {
          def.resolve(data._source);
        },
        dataType: 'json'
      });
      return def.promise();
    },

    simplify: function(movieObject) {
      var movieDto = {};
      movieDto.id = movieObject.id;
      movieDto.year = movieObject.year;
      movieDto.title = movieObject.title;
      movieDto.originaltitle = movieObject.originaltitle;

      // titleAndOriginal
      var sameTitle = true;
      if(movieDto.title && movieDto.originaltitle){
        sameTitle = movieDto.title[0] === movieDto.originaltitle[0]
      }
      if(sameTitle){
        movieDto.titleAndOriginal = movieObject.title;
      }
      else{
        movieDto.titleAndOriginal = movieObject.title + ' ('+ movieDto.originaltitle +')';
      }

      // firstThumb
      if(movieObject.thumb.length > 0){
        movieDto.firstThumb = movieObject.thumb[0].prevThumb;
      }

      movieDto.director = movieObject.director;
      movieDto.idImdb = movieObject.idImdb;
      
      movieDto.imdbInfo = movieObject.imdbInfo;

      return movieDto;
    }    

  });

});