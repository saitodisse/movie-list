/*global MoviesMVC*/

'use strict';
MoviesMVC.module('ResultsProcessor', function (ResultsProcessor) {

  ResultsProcessor.Processor = function() {};

  _.extend(ResultsProcessor.Processor.prototype, {
    simplify: function(movieObject) {
      var movieDto = {};
      movieDto.id = movieObject.id;
      movieDto.title = movieObject.title;
      movieDto.originaltitle = movieObject.originaltitle;
      movieDto.idImdb = movieObject.idImdb;
      
      movieDto.imdbInfo = {};
      movieDto.imdbInfo.rating = movieObject.imdbInfo.rating;

      return movieDto;
    }
  });

});
