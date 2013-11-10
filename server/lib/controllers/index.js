var fs = require('fs');
var path = require('path');


fs.readdirSync(__dirname)
  .filter(function (filename) {
    return filename !== 'index.js';
  })
  .filter(function (filename) {
    return (/\.js$/).test(filename);
  })
  .forEach(function(filename) {
    var name = filename.substr(0, filename.length - path.extname(filename).length);
    exports[name] = require('./' + filename);
  });
