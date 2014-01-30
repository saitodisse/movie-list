/**
 https://gist.github.com/funkjedi/5732611
 Usage: Just include this script after Marionette and Handlebars loading
 IF you use require.js add script to shim and describe it in the requirements
*/
(function(Handlebars, Marionette) {
 
  Marionette.Handlebars = {
    path: 'templates/',
    extension: '.handlebars'
  };
 
  Marionette.TemplateCache.prototype.load = function() {
    if (this.compiledTemplate) {
      return this.compiledTemplate;
    }
    if (Handlebars.templates && Handlebars.templates[this.templateId]) {
      this.compiledTemplate = Handlebars.templates[this.templateId];
    }
    else {
      var template = this.loadTemplate(this.templateId);
      this.compiledTemplate = this.compileTemplate(template);
    }
    return this.compiledTemplate;
  };
 
  Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
    var template, templateUrl;
    try {
      template = Marionette.$(templateId).html();
    }
    catch (e) {}
    if (!template || template.length === 0) {
      templateUrl = Marionette.Handlebars.path + templateId + Marionette.Handlebars.extension;
      Marionette.$.ajax({
        url: templateUrl,
        success: function(data) {
          template = data;
        },
        async: false
      });
      if (!template || template.length === 0){
        throw "NoTemplateError - Could not find template: '" + templateUrl + "'";
      }
    }
    return template;
  };
 
  Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    return Handlebars.compile(rawTemplate);
  };
 
}(Handlebars, Marionette));

// Backbone.Marionette.Renderer.render = function(templateId, data){
//   var source   = $(templateId).html();
//   var template = Handlebars.compile(source);
//   return template(data);
// };


Handlebars.registerHelper('commalist', function(items, options) {
  var out = '';

  if(typeof items !== 'object'){
    return '';
  }

  for(var i=0, l=items.length; i<l; i++) {
    out = out + options.fn(items[i]) + (i!==(l-1) ? ", ":"");
  }
  return out;
});

Handlebars.registerHelper("first", function(array) {
  return array[0];
});

Handlebars.registerHelper("last", function(array) {
  return array[array.length-1];
});