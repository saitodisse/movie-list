/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.LatestSearchesView = Marionette.ItemView.extend({
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
      }.bind(this));
    },

    addSearch: function(searchModel) {
      searchModel.save();
      this.addDropdownItem(searchModel);
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
        var jLi = jA.parent();
        jLi.remove();
      }
    }
  });

});