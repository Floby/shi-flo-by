var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var express = require('express');
var shoe = require('mux-demux-shoe');
var Model = require('scuttlebutt/model');
var ObjectId = require('mongoose').Types.ObjectId;


var initiliazer = module.exports = function (options) {
  // EXPRESS
  var server = express();
  var controllers = require('./controllers');

  server.configure(function () {
    server.set('port', options.port);
    if(!options.silent) server.use(express.logger('dev'));
    server.use(server.router);
    server.use(express.static(path.resolve(options.base)));
  });

  server.param('game_id', function (req, res, next, game_id) {
    try {
      ObjectId.fromString(game_id);
      next();
    }
    catch(e) {
      res.send(404);
    }
  });
  server.post('/game', controllers.game.create);
  server.get('/game/:game_id', controllers.game.get);

  var httpServer = http.createServer(server);

  // SHOE
  var router = require('./shoeRouter');

  shoe(router).install(httpServer, '/shoe');

  mongoose.connect(options.database);

  return httpServer;
};


