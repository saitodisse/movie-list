/*global App, Handlebars */

'use strict';
App.module('Base.Views.Movies', function (Movies, App, Backbone, Marionette, $) {

  Movies.SearchNavigation = Marionette.ItemView.extend({
    template: 'movies/search-navigation',

    events:{
      'click .btnPrevPage': 'prevPage',
      'click .btnNextPage': 'nextPage',
      'click .btnThumbView': 'showThumb',
      'click .btnTableView': 'showTable'
    },

    modelEvents: {
      "change:page": "updateStats",
      "change:query": "render"
    },

    initialize: function() {
      App.vent.on('search_fetched', this. updateStats, this);
    },


    onShow: function () {
      $(document).on('keydown', this.processShortcut.bind(this));
    },

    onClose: function () {
      $(document).off('keydown');
    },

    processShortcut: function(e) {
      //LEFT
      if(e.which === 37){
        this.prevPage();
        $('.btnPrevPage').fadeOut(30).fadeIn(20);
      }
      //RIGHT
      else if(e.which === 39){
        this.nextPage();
        $('.btnNextPage').fadeOut(30).fadeIn(20);
      }
    },


    prevPage: function() {
      App.vent.trigger('goPrevPage');
    },

    nextPage: function() {
      App.vent.trigger('goNextPage');
    },

    updateStats: function() {
      $(this.el).find('#pageNumber').text(this.model.get('page'));
      $(this.el).find('#totalPageNumber').text(this.model.get('totalPages'));
      $(this.el).find('#totalMovies').text(this.model.get('total'));
    },

    showThumb: function() {
      this.trigger('show:thumb');
      $(this.el).find('.btnTableView').removeClass('active');
      $(this.el).find('.btnThumbView').addClass('active');
    },

    showTable: function() {
      this.trigger('show:table');
      $(this.el).find('.btnThumbView').removeClass('active');
      $(this.el).find('.btnTableView').addClass('active');
    }

  });
});