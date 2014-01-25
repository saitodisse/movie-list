/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.LatestSearchesView = Backbone.View.extend({
    tagName: 'li',
    
    className: 'dropdown',
    
    template: '#latest-searches-template',

    events: {
      'click li a': 'linkClicked'
    },

    initialize: function() {
      this.render();
      this.collection.on('add', this.addSearch, this)
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    },

    addSearch: function(search) {
      var id = search.get('id');
      var query = search.get('query');
      var count = search.get('resultsCount');
      var jTitle_a = this.$('#dropdown-title');
      var jLink_ul = this.$('#link-list');

      jTitle_a.text(query);
      jLink_ul.prepend('<li><a href="#" data-id="'+ id +'">' + query + ' ['+ count +']</a></li>');
    },

    getLatest: function(query) {
      this.jTitle_a = this.$('#dropdown-title');
      return this.jTitle_a.text();
    },

    linkClicked: function(e) {
      e.preventDefault();
      var query = $(e.target).data('query');
      MoviesMVC.vent.trigger('search_queried', query);
    }
  });


  Views.HomeView = Backbone.View.extend({
    template: '#home-template',

    initialize: function() {
      this.render();
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    }
  });


  Views.MoviesView = Backbone.View.extend({
    template: '#movies-template',

    initialize: function() {
      //this.render(options.json);
      //this.collection.on('reset', this.render, this);
    },

    render: function(jsonMovies) {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      var html = template({movies: jsonMovies});
      $(this.el).html(html);

      //this.collection.each(this.renderMovie.bind(this));
    },

    renderMovie: function(movie) {
      var movieTrView = new Views.MovieTrView({
        model: movie
      });
      movieTrView.render();
      this.$('tbody').append(movieTrView.el);
    }
  });


  Views.MovieTrView = Backbone.View.extend({
    template: '#movieTr-template',

    tagName: 'tr',

    initialize: function() {
      this.render();
    },

    render: function() {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      $(this.el).html(template(this.model.toJSON()));
    }
  });

  Views.MovieDetailView = Backbone.View.extend({
    template: '#movieDetail-template',

    initialize: function() {
      if(typeof this.model !== 'undefined'){
        this.render();
      }
    },

    render: function() {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      $(this.el).html(template(this.model.toJSON()));
    }
  });


  Views.MovieDetailThumbView = Backbone.View.extend({
    template: '#movieDetailThumb-template',

    initialize: function(options) {
      this.thumbId = options.thumbId;
      this.render();
    },

    render: function() {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      var movieJson = this.model.toJSON();
      
      // get selected thumb
      var thumb = _.find(this.model.get('thumb'), function(item) {
        return item.name === this.thumbId;
      }.bind(this));
      movieJson.thumbSrc = thumb.longThumb;

      $(this.el).html(template(movieJson));
    }
  });


  Views.AboutView = Backbone.View.extend({
    template: '#about-template',

    initialize: function() {
      this.render();
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    }
  });

});
