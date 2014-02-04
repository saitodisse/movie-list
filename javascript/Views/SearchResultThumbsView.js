/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.SearchResultThumbsView = Marionette.ItemView.extend({
    template: 'moviesThumb',

    events:{
      'click .btnShowThumbs': 'btnShowThumbsClicked',
      'click .btnPrevPage': 'prevPage',
      'click .btnNextPage': 'nextPage'
    },

    prevPage: function() {
      MoviesMVC.vent.trigger('goPrevPage');
    },

    nextPage: function() {
      MoviesMVC.vent.trigger('goNextPage');
    },

    btnShowThumbsClicked: function() {
      MoviesMVC.showThumbsSearch = false;
      MoviesMVC.router.navigate('movies', {trigger: true});
    },

    onShow: function() {
      var selected = this.model.getSelectedResult();
      if(selected){
        var jSelectedTr = this.$el.find('[data-id="'+ selected.id +'"]');
        $(window).scrollTop(jSelectedTr.position().top - 100);
        jSelectedTr.fadeOut(50).fadeIn(150).fadeOut(100).fadeIn(250);
      }
    },

  });


});