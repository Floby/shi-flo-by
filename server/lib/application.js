var path = require('path');
var http = require('http');
var express = require('express');
var shoe = require('mux-demux-shoe');
var Model = require('scuttlebutt/model');


var initiliazer = module.exports = function (options) {
  // EXPRESS
  var server = express();
  var controllers = require('./controllers');

  server.configure(function () {
    server.set('port', options.port);
    server.use(express.logger('dev'));
    server.use(server.router);
    server.use(express.static(path.resolve(options.base)));
  });

  server.post('/game', controllers.game.create);
  server.get('/game/abcd', controllers.game.get);

  var httpServer = http.createServer(server);

  // SHOE
  var router = require('./shoeRouter');

  shoe(router).install(httpServer, '/shoe');

  return httpServer;
};


