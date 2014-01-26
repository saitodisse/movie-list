/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.LatestSearchesView = Backbone.View.extend({
    tagName: 'li',
    
    className: 'dropdown',
    
    template: '#latest-searches-template',

    events: {
      'click li a': 'linkClicked',
      'click li .glyphicon-remove': 'removeClicked'
    },

    initialize: function() {
      this.render();
      
      //MoviesMVC.searchCollection
      this.collection.on('add', this.addSearch, this);
      //this.collection.on('searched', this.updateDropdownTitle, this);
      this.collection.on('remove', this.removeListElement, this);
      MoviesMVC.vent.on('search_queried', this.updateDropdownTitle, this);
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    },

    addSearch: function(searchModel) {
      if(searchModel.hasResults()){
        this.addDropdownItem(searchModel);
      }
    },

    updateDropdownTitle: function(query, searchModel) {
      var jTitle_a = this.$('#dropdown-title');
      jTitle_a.text(this.getSearchFormated(searchModel));
    },

    getSearchFormated: function(searchModel) {
      var query = searchModel.get('query');
      var results = searchModel.get('results');
      var resultsCount = results.length;
      return query + ' ['+ resultsCount +']';
    },

    addDropdownItem: function(searchModel) {
      var jLink_ul = this.$('#link-list');
      jLink_ul.prepend(this.getLiHtml(searchModel));
    },

    getLiHtml: function(searchModel) {
      var id = searchModel.get('id');
      return  '<li>' +
                '<a href="#" data-id="'+ id +'">' +
                  '<span class="glyphicon glyphicon-remove"></span>' +
                   this.getSearchFormated(searchModel) +
                '</a>' +
              '</li>';
    },

    getLatest: function() {
      this.jTitle_a = this.$('#dropdown-title');
      return this.jTitle_a.text();
    },

    linkClicked: function(e) {
      e.preventDefault();
      var id = $(e.target).data('id');
      var searchModel = this.collection.get(id);
      MoviesMVC.vent.trigger('search_queried', searchModel.get('query'), searchModel);
    },

    removeClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var id = $(e.target).parent().data('id');
      var searchModel = this.collection.get(id);
      searchModel.destroy();
    },

    removeListElement: function(model) {
      var jA = this.$('#link-list').find('[data-id="' + model.id + '"]');
      if(jA){
        var jLi = jA.parent()
        jLi.remove();
      }
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


  Views.SearchResultView = Backbone.View.extend({
    template: '#movies-template',

    events:{
      'click td': 'tdClicked'
    },

    tdClicked: function(e) {
      var jTd = $(e.target);
      var jTr = jTd.parent();
      var id = jTr.data('id');
      MoviesMVC.controller.router.navigate('movies/' + id, {trigger: true});
    },

    render: function(jsonMovies) {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      var html = template({movies: jsonMovies});
      $(this.el).html(html);
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
