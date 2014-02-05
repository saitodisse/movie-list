/*global App */
'use strict';

App.module('Base.Helpers', function (Helpers, App) {

  Helpers.LayoutChanger = function(){};

  _.extend(Helpers.LayoutChanger.prototype, {

    initialize: function() {
      this.initializeLayouts();
      this.initializeViews();

      App.vent.on('layout_showed', this.showViews, this);
    },

    initializeLayouts: function() {
      this.layouts = {};
      this.layouts.counter = 0;
      this.layouts.list = [];
    },

    addLayout: function(layout) {
      this.layouts.list.push(layout);
    },

    initializeViews: function() {
      this.views = {};
      this.views.list = [];

      this.leftView = null;
      this.views.leftCounter = 0;

      this.rightView = null;
      this.views.rightCounter = 0;
    },

    addView: function(view) {
      this.views.list.push(view);
    },

    getNextLayout : function() {
      this.layouts.counter += 1;
      var layout = this.getCurrentLayout();

      App.vent.trigger('new_layout', layout);

      return layout;
    },

    countVisibleViews: function() {
      var visibleViews = 0;
      if(!_.isNull(this.leftView)){
        visibleViews++;
      }
      if(!_.isNull(this.rightView)){
        visibleViews++;
      }

      return visibleViews;
    },

    showViews: function() {
      var rmArray = this.regionManagerArray();
      var hasOneRegion = rmArray.length === 1;
      var hasTwoRegions = rmArray.length === 2;
      var visibleViews = this.countVisibleViews();
      var isLeftNull = _.isNull(this.leftView);
      var isRightNull = _.isNull(this.rightView);

      var needToChangeLayout =  (rmArray.length === 1 && visibleViews === 2) ||
                                (rmArray.length === 2 && visibleViews === 1);
      if(needToChangeLayout){
        this.getNextLayout();
        this.showViews();
        return;
      }

      // full screen
      if( hasOneRegion ){
        
        var onlyRightViewVisible = isLeftNull  && !isRightNull;
        var onlyLeftViewVisible  = isRightNull && !isLeftNull;
        
        if( onlyRightViewVisible ) {
          rmArray[0].show(this.rightView);
        }
        else if ( onlyLeftViewVisible ) {
          rmArray[0].show(this.leftView);
        }
        else{
          rmArray[0].close();
        }
      }
      
      // left and right
      if( hasTwoRegions ){
        if(!isLeftNull){
          rmArray[0].show(this.leftView);
        }
        if(!isRightNull){
          rmArray[1].show(this.rightView);
        }
      }

    },

    getCurrentLayout : function() {
      var index = this.layouts.counter % this.layouts.list.length;
      return this.layouts.list[index];
    },

    regionManagerArray: function() {
      return this.getCurrentLayout().regionManager.toArray();
    },

    getNextLeftView : function() {
      var total = this.views.list.length;
      var index = this.views.leftCounter % total;
      this.views.leftCounter += 1;

      if(!_.isNull(this.views.list[index])){
        this.leftView = new this.views.list[index]();
      }
      else{
        this.leftView = null;
      }

      this.showViews();

      return this.leftView;
    },

    getNextRightView : function() {
      var total = this.views.list.length;
      var index = this.views.rightCounter % total;
      this.views.rightCounter += 1;

      if(!_.isNull(this.views.list[index])){
        this.rightView = new this.views.list[index]();
      }
      else{
        this.rightView = null;
      }

      this.showViews();

      return this.rightView;
    },


  });

});