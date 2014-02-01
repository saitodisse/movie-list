/*global MoviesMVC*/

'use strict';
MoviesMVC.module('MovieList.Models', function (Models, App, Backbone) {

  Models.Movie = Backbone.Model.extend({
    initialize: function() {
      this.set('filePaths', function() {
        var originalBasepath = this.get('basepath');
        var newBasePath = [];
        originalBasepath.forEach(function(base) {
          var splited = base.split('\\');
          var onlyFolder = splited.slice(0, splited.length-1).join('\\') + "\\";
          var onlyFile = splited.slice(-1);
          newBasePath.push({
            folder: onlyFolder,
            fullPath: base,
            onlyFile: onlyFile
          });
        })
        return newBasePath;
      }.bind(this));
    },
  });

});
