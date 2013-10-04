var initiliazer = module.exports = function (options) {
  var path = require('path');
  var http = require('http');
  var express = require('express');
  var shoe = require('mux-demux-shoe');
  var Model = require('scuttlebutt/model');

  // EXPRESS

  var server = express();

  server.configure(function () {
    server.set('port', options.port);
    server.use(express.logger('dev'));
    server.use(server.router);
    server.use(express.static(path.resolve(options.base)));
  });

  var httpServer = http.createServer(server);

  // SHOE

  var router = require('./shoeRouter');

  shoe(router).install(httpServer, '/shoe');

  return httpServer;
};

if (!module.parent) {
  var argv = require('optimist')
    .default('port', 8124)
    .default('base', 'tmp/public')
    .describe('port', 'Run server on this port')
    .argv;
  var server = initiliazer(argv);
  server.listen(8124, function () {
    console.log('Server listening on http://localhost:8124/');
  });
}
