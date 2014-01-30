/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MovieDetailView = Marionette.ItemView.extend({
    template: '#movieDetail-template',

    events:{
      'click .btn-prev': 'goPrevMovie',
      'click .btn-next': 'goNextMovie'
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
        MoviesMVC.router.navigate('movies', {trigger: true});
      }
    },

    goPrevMovie: function() {
      var searchList = MoviesMVC.currentSearchModel.get('results');
      var thisItem = searchList.filter(function (el) {
        return el.id === this.model.id
      }, this);
      var indexOf = _.indexOf(searchList, thisItem[0]);

      if(indexOf > 0){
        var gotoItem = searchList[indexOf-1];
        if(gotoItem){
          var router = MoviesMVC.router;
          router.navigate('movies/' + gotoItem.id, {trigger: true});
        }
      }

    },

    goNextMovie: function() {
      var searchList = MoviesMVC.currentSearchModel.get('results');
      var thisItem = searchList.filter(function (el) {
        return el.id === this.model.id
      }, this);
      var indexOf = _.indexOf(searchList, thisItem[0]);

      if(indexOf < searchList.length){
        var gotoItem = searchList[indexOf+1];
        if(gotoItem){
          var router = MoviesMVC.router;
          router.navigate('movies/' + gotoItem.id, {trigger: true});
        }
      }
    },

    render: function() {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      $(this.el).html(template(this.model.toJSON()));
    }
  });

});