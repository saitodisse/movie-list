/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {
  // MovieList Router
  // ---------------
  //
  // Handle routes to show the active vs complete todo items
  MovieList.Router = Marionette.AppRouter.extend({
    appRoutes: {
      //'*filter': 'filterItems'
      '': 'goHome',
      'search': 'goSearch',
      'about': 'goAbout'
    }
  });

  // MovieList Controller (Mediator)
  // ------------------------------
  //
  // Control the workflow and logic that exists at the application
  // level, above the implementation detail of views and models
  MovieList.Controller = function () {
  };

  _.extend(MovieList.Controller.prototype, {
    // Start the app by showing the appropriate views
    // and fetching the list of todo items, if there are any
    start: function () {
      this.jMenu = $('.mainMenu');
      this.jMain = $('.main');
    },

    setMenuActive: function(menuClass) {
      this.jMenu.find('li').removeClass('active');
      var jHomeMenu = this.jMenu.find(menuClass);
      jHomeMenu.addClass('active');
    },

    goHome: function() {
      this.setMenuActive('.home');

      var view = new MovieList.Views.HomeView();
      __MELD_LOG('HomeView', view, 2);
      view.render();

      this.jMain.html(view.el);
    },

    goSearch: function() {
      this.setMenuActive('.search');

      var view = new MovieList.Views.SearchView();
      __MELD_LOG('SearchView', view, 2);
      view.render();

      this.jMain.html(view.el);
    },

    goAbout: function() {
      this.setMenuActive('.about');

      var view = new MovieList.Views.AboutView();
      __MELD_LOG('AboutView', view, 2);
      view.render();

      this.jMain.html(view.el);
    }
  });

  // MovieList Initializer
  // --------------------
  //
  // Get the MovieList up and running by initializing the mediator
  // when the the application is started, pulling in all of the
  // existing Todo items and displaying them.
  MovieList.addInitializer(function () {
    var controller = new MovieList.Controller();
    __MELD_LOG('Controller', controller, 11);

    controller.router = new MovieList.Router({
      controller: controller
    });
    __MELD_LOG('Router', controller.router, 12);

    controller.start();
  });
});
