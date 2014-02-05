/*global App, Handlebars */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.SearchResultView = Marionette.ItemView.extend({
    template: 'movies',

    events:{
      'click .trMovie': 'tdClicked',
      'click .btnShowThumbs': 'btnShowThumbsClicked',
      'click .btnPrevPage': 'prevPage',
      'click .btnNextPage': 'nextPage'
    },

    tdClicked: function(e) {
      var jTd = $(e.target);
      var jTr = jTd.parent();
      var id = jTr.data('id');
      App.router.navigate('movies/' + id, {trigger: true});
    },

    btnShowThumbsClicked: function() {
      App.showThumbsSearch = !App.showThumbsSearch;
      App.router.navigate('movies', {trigger: true});
    },

    prevPage: function() {
      App.vent.trigger('goPrevPage');
    },

    nextPage: function() {
      App.vent.trigger('goNextPage');
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