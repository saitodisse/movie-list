/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MovieDetailThumbView = Marionette.ItemView.extend({
    template: 'movieDetailThumb',

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