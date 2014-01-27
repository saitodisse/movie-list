Handlebars.registerHelper('commalist', function(items, options) {
  var out = '';

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