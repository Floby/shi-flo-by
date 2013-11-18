var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var express = require('express');
var shoe = require('mux-demux-shoe');
var Model = require('scuttlebutt/model');
var ObjectId = require('mongoose').Types.ObjectId;

var oneDay = 24 * 60 * 60 * 1000;


var initiliazer = module.exports = function (options) {
  // EXPRESS
  var server = express();
  var routes = require('./routes');

  server.configure(function () {
    server.set('port', options.port);
    server.use(function (req, res, next) {
      res.removeHeader('X-Powered-By');
      next();
    });
    if(!options.silent) server.use(express.logger('dev'));
    server.use(express.compress());
    server.use(server.router);
    server.use(express.static(path.resolve(options.base), {maxAge: oneDay}));
  });

  // TODO move this elsewhere
  server.param('game_id', function (req, res, next, game_id) {
    try {
      ObjectId.fromString(game_id);
      next();
    }
    catch(e) {
      res.send(404);
    }
  });

  routes.setupRoutes(server);

  var httpServer = http.createServer(server);

  // SHOE
  var router = require('./shoeRouter');

  shoe(router).install(httpServer, '/shoe');
  if(!options.noConnectMongoose) mongoose.connect(options.database);

  return httpServer;
};


