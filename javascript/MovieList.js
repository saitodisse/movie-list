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
      'movies': 'goMovies',
      'movies/:id': 'goMovieDetails',
      'movies/:id/thumbs/:thumbId': 'goMovieDetailThumb',
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

      this.jSearchInput = $('#q');
      this.jLastSearch = $('#lastSearch');

      this.jSearchInput.on('keyup', this.keyuped.bind(this));
      this.jLastSearch.on('click', function() {
        var query = this.jLastSearch.text();
        this.searchMovies(query);
        this.goMovies();
        this.jSearchInput.val(query);
      }.bind(this));
      
      MoviesMVC.moviesCollection = new MovieList.Models.MovieCollection();
      __MELD_LOG('MovieCollection', MoviesMVC.moviesCollection, 3);
    },

    keyuped: function(e) {
      if(e.which === 13){
        var query = this.jSearchInput.val();
        this.searchMovies(query);
        this.jLastSearch.text(query);
        this.jSearchInput.val('');
      }
    },

    searchMovies: function(query) {
      this.searchElasticSearch(query)
        .done(function(results) {
          MoviesMVC.moviesCollection.reset(results);
        }.bind(this))
      ;
    },

    setMenuActive: function(menuClass) {
      this.jMenu.find('li').removeClass('active');
      var jHomeMenu = this.jMenu.find(menuClass);
      jHomeMenu.addClass('active');
    },

    goHome: function() {
      this.setMenuActive('.home');

      var view = new MovieList.Views.HomeView();
      __MELD_LOG('HomeView', view, 20);
      view.render();

      this.jMain.html(view.el);
    },

    goMovies: function() {
      this.setMenuActive('.movies');

      var view = new MovieList.Views.MoviesView({
        collection: MoviesMVC.moviesCollection
      });
      __MELD_LOG('MoviesView', view, 21);
      view.render();

      this.jMain.html(view.el);
    },

    goMovieDetails: function(id) {
      this.setMenuActive('.movies');

      var view = new MovieList.Views.MovieDetailView({
        model: MoviesMVC.moviesCollection.get(id)
      });
      __MELD_LOG('MovieDetailView', view, 21);
      view.render();

      this.jMain.html(view.el);
    },

    goMovieDetailThumb: function(id, thumbId) {
      this.setMenuActive('.movies');

      var view = new MovieList.Views.MovieDetailThumbView({
        model: MoviesMVC.moviesCollection.get(id),
        thumbId: thumbId
      });
      __MELD_LOG('MovieDetailView', view, 21);
      view.render();

      this.jMain.html(view.el);
    },

    goAbout: function() {
      this.setMenuActive('.about');

      var view = new MovieList.Views.AboutView();
      __MELD_LOG('AboutView', view, 22);
      view.render();

      this.jMain.html(view.el);
    },

    searchElasticSearch: function(query) {
      var def = $.Deferred();

      var data = {
          size: 500,
          sort: 'imdbInfo.rating:desc',
          q: query
      };

      $.ajax({
        url: 'http://localhost:9200/movies/movie/_search',
        data: data,
        //data: data,
        success: function(data) {
          var results = [];
          for (var i = 0; i < data.hits.hits.length; i++) {
            var hit = data.hits.hits[i];
            results.push(hit._source);
          };
          def.resolve(results);
        },
        dataType: 'json'
      });
      return def.promise();
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
