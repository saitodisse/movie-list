/*global App */
'use strict';

App.module('Base.Helpers', function (Helpers, App, Backbone, Marionette) {

  Helpers.LayoutChanger = function(){};

  _.extend(Helpers.LayoutChanger.prototype, {

    initialize: function() {
      this.initializeLayouts();
      this.initializeViews();
    },

    initializeLayouts: function() {
      this.layouts = {};
      this.layouts.counter = 0;
      this.layouts.list = [];
    },

    addLayout: function(layout) {
      this.layouts.list.push(layout);
    },

    getNextLayout : function() {
      this.layouts.counter += 1;
      var layout = this.getCurrentLayout();
      return layout;
    },

    getCurrentLayout : function() {
      var index = this.layouts.counter % this.layouts.list.length;
      return this.layouts.list[index];
    },

    regionManager: function() {
      return this.getCurrentLayout().regionManager;
    },

    getRegionOrChangeLayout: function(regionIndex) {
      var rmArray = this.regionManager().toArray();

      if(regionIndex <= rmArray.length-1){
        return rmArray[regionIndex];
      }
      else{
        this.getNextLayout();
        return this.getRegionOrChangeLayout(regionIndex);
      }
    },

    initializeViews: function() {
      this.views = {};
      this.views.counter = 0;
      this.views.list = [];
    },

    addView: function(view) {
      this.views.list.push(view);
    },

    getNextView : function(regionIndex) {
      if(!_.isNumber(regionIndex)){
        throw new Error('a regionIndex must be provided');
      }

      var index = this.views.counter % this.views.list.length;
      var view = this.views.list[index];

      var region = this.getRegionOrChangeLayout(regionIndex);
      region.show(view);
      
      this.views.counter += 1;
      
      return view;
    },


  });

});