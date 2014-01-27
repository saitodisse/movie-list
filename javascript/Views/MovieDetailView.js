/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.MovieDetailView = Backbone.View.extend({
    template: '#movieDetail-template',

    events:{
      'click .btn-prev': 'goPrevMovie',
      'click .btn-next': 'goNextMovie'
    },

    initialize: function() {
      if(typeof this.model === 'undefined'){
        return;
      }

      this.render();

      //TODO: use marionette views and regions to avoid "GHOSTS"
      //$(document).on('keydown', this.processShortcut.bind(this));

      window.scrollTo(0,1);
    },

    processShortcut: function(e) {
      if(e.which === 37){
        this.goPrevMovie();
      }
      else if(e.which === 39){
        this.goNextMovie();
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
          var router = MoviesMVC.controller.router;
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
          var router = MoviesMVC.controller.router;
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