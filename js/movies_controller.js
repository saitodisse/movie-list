/*global App */

// /////////////////////////////////////////
//
//  Using a controller to change content in a marionette.layout
//
//  https://github.com/marionettejs/backbone.marionette/wiki/Using-a-controller-to-change-content-in-a-marionette.layout
//
// /////////////////////////////////////////

'use strict';
App.module('Base', function (Base, App, Backbone, Marionette) {

  Base.MoviesController = Marionette.Controller.extend({

    initialize: function(options){
      // store a region that will be used to show the stuff rendered by this component
      this.mainRegion = options.mainRegion;
      this.moviesCollection = options.moviesCollection;
      this.searchModel = options.searchModel;
    },

    // call the 'show' method to get this thing on screen
    show: function(){
      // get the layout and show it
      var layout = this._getLayout();
      this.mainRegion.show(layout);
    },

    // build the layout and set up a "render" event handler.
    // the event handler will set up the additional views that
    // need to be displayed in the layout. do this in "render"
    // so that the initial views are already rendered in to the
    // layout when the layout is displayed in the DOM
    _getLayout: function(){
      var layout = new Base.Views.Layouts.SearchLayout();

      this.listenTo(layout, 'render', function(){
        this._showNavigationAndResult(layout);
      }, this);

      return layout;
    },

    // render the navigation and the initial "result" in to the layout.
    // set up an event handler so that when the navigation triggers the
    // event, the "result" will be changed appropriately.
    _showNavigationAndResult: function(layout){

      var navigation = this._addNavigation(layout.navigation);
      this._showTable(layout.result);

      // this is a custom event triggered from the navigation view.
      // it doesn't matter what the event name is. it just needs
      // to be triggered at the right time, from the navigation view.
      navigation.on('show:table', function(){
        // when the event is triggered, change the "result" in
        // the '"result"' region of the layout
        this._showTable(layout.result);
      }, this);

      navigation.on('show:thumb', function(){
        // when the event is triggered, change the "result" in
        // the '"result"' region of the layout
        this._showThumb(layout.result);
      }, this);
    },

    // add the navigation to the region specified, and return it
    // so it can be used for events, etc
    _addNavigation: function(region){
      var navigation = new Base.Views.Movies.SearchNavigation({
        model: this.searchModel
      });
      region.show(navigation);
      return navigation;
    },

    // add the initial "result" to the region specified
    _showTable: function(region){
      var view = new Base.Views.Movies.Table.Movies({
        collection: this.moviesCollection
      });
      region.show(view);
    },

    // change the "result" in the region specified
    _showThumb: function(region){
      var view = new Base.Views.Movies.Thumb.Movies({
        collection: this.moviesCollection
      });
      region.show(view);
    }
  });

});