/*global App, Handlebars */

'use strict';
App.module('Base.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MovieDetailView = Marionette.ItemView.extend({
    template: 'movieDetail',

    events:{
      'click .btn-back-to-list': 'backToList',
      'keydown .path_TextArea': 'textAreaKeyDown'
    },

    initialize: function() {
      if(typeof this.model === 'undefined'){
        return;
      }
      window.scrollTo(0,1);
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
        this.goPrevMovie();
      }
      //RIGHT
      else if(e.which === 39){
        this.goNextMovie();
      }
      //Backspace
      else if(e.which === 8){
        this.backToList()
      }
    },

    goPrevMovie: function() {
      var searchList = App.currentSearchModel.get('results');
      var thisItem = searchList.filter(function (el) {
        return el.id === this.model.id
      }, this);
      var indexOf = _.indexOf(searchList, thisItem[0]);

      if(indexOf > 0){
        var gotoItem = searchList[indexOf-1];
        if(gotoItem){
          var router = App.router;
          router.navigate('movies/' + gotoItem.id, {trigger: true});
        }
      }

    },

    goNextMovie: function() {
      var searchList = App.currentSearchModel.get('results');
      var thisItem = searchList.filter(function (el) {
        return el.id === this.model.id
      }, this);
      var indexOf = _.indexOf(searchList, thisItem[0]);

      if(indexOf < searchList.length){
        var gotoItem = searchList[indexOf+1];
        if(gotoItem){
          var router = App.router;
          router.navigate('movies/' + gotoItem.id, {trigger: true});
        }
      }
    },

    backToList: function() {
      App.router.navigate('movies', {trigger: true});
    },

    textAreaKeyDown: function(e) {
      //catch Ctrl+C
      if( e.which === 67 && e.ctrlKey ){
        var target = e.target;
        target.focus();
        target.select();
      }
    }

  });

});