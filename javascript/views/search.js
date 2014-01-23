'use strict';
(function() {
  
  MovieList.SearchView = Backbone.View.extend({
    template: "#search-template",

    events: {
      'keyup .q': 'keyuped'
    },

    initialize: function() {
      this.render();
      this.jQ = this.$('.q');
    },

    keyuped: function(e) {
      if(e.which === 13){
        MovieList.trigger('movie_searched', this.jQ.val());
        this.jQ.val('');
      }
    },

    render: function() {
      var source   = $(this.template).html();
      var html = Handlebars.compile(source);
      $(this.el).html(html);
    }
  });

})();
