/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  Views.SearchResultView = Marionette.ItemView.extend({
    template: 'movies',

    events:{
      'click .trMovie': 'tdClicked'
    },

    tdClicked: function(e) {
      var jTd = $(e.target);
      var jTr = jTd.parent();
      var id = jTr.data('id');
      MoviesMVC.router.navigate('movies/' + id, {trigger: true});
    },

    onShow: function() {
      var selected = this.model.getSelectedResult();
      if(selected){
        var jSelectedTr = this.$el.find('[data-id="'+ selected.id +'"]');
        $(window).scrollTop(jSelectedTr.position().top - 100);
        jSelectedTr.fadeOut(50).fadeIn(150).fadeOut(100).fadeIn(250);
      }
    },

  });


});