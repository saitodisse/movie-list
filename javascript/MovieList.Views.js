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

      this.collection.on('add', this.addSearch, this);
      this.collection.on('remove', this.removeListElement, this);
      this.collection.on('reset', this.renderAllSearches, this);
      MoviesMVC.vent.on('results_received', this.updateDropdownTitle, this);
    },

    render: function() {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);
      $(this.el).html(template);
    },

    renderAllSearches: function() {
      this.collection.each(function(searchModel) {
        this.addDropdownItem(searchModel);
      }.bind(this))
    },

    addSearch: function(searchModel) {
      var commingQuery = searchModel.get('query');
      // var existingSerchModel = this.collection.filter(function(item) {
      //   return item.get('query') === commingQuery;
      // })

      // if(!existingSerchModel){
        searchModel.save();
        this.addDropdownItem(searchModel);
      // }
    },

    updateDropdownTitle: function(searchModel) {
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
      MoviesMVC.vent.trigger('query_received', searchModel.get('query'));
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
      var template = Handlebars.compile(source);
      $(this.el).html(template);
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
      var template = Handlebars.compile(source);
      $(this.el).html(template);
    }
  });

  Views.IMoviesView = Backbone.View.extend({
    template: '#imovies-template',

    initialize: function() {
      this.render();
    },

    render: function() {
      var source   = $(this.template).html();
      var template = Handlebars.compile(source);

      var toSend = {};
      toSend.searches = this.collection.toJSON();

      var tenYears = _.range(1901, 2022, 10);
      toSend.yearsBlock = [];
      for (var i = 0; i < (tenYears.length - 1); i++) {
        var eachYear = _.range(tenYears[i], tenYears[i+1]);
        toSend.yearsBlock.push(eachYear);
      };

      var tenYears = _.range(1900, 2021, 10);
      toSend.yearRanges = [];
      for (var i = 0; i < (tenYears.length - 1); i++) {
        toSend.yearRanges.push({
          start: tenYears[i],
          end: tenYears[i+1]
        });
      };


      $(this.el).html(template(toSend));
    }
  });

});
