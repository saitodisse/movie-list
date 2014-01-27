/*global MoviesMVC*/

'use strict';
MoviesMVC.module('ResultsProcessor', function (ResultsProcessor) {

  ResultsProcessor.Processor = function() {};

  _.extend(ResultsProcessor.Processor.prototype, {
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
      
      movieDto.imdbInfo = {};
      movieDto.imdbInfo.rating = movieObject.imdbInfo.rating;

      return movieDto;
    }
  });

});
