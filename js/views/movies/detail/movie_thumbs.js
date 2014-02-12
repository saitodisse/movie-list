/*global App */

'use strict';
App.module('Base.Views.Movies.Detail', function (Detail, App, Backbone, Marionette, $) {

  Detail.MovieThumbs = Marionette.ItemView.extend({
    template: 'movies/detail/movie_thumbs',

    initialize: function(options) {
      this.thumbId = options.thumbId;
    },

    onBeforeRender: function() {
      var thumbsArray = this.model.get('thumb');
      var thumb = _.find(thumbsArray, function(item) {
        return item.name === this.thumbId;
      }.bind(this));
      this.model.set('thumbSrc', thumb.longThumb);
    }
    
  });

});