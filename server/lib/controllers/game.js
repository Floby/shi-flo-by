var Game = require('../models/game');
var CastError = require('mongoose/lib/error').CastError;

exports.get = function (req, res, next) {
  var gameId = req.params.game_id;
  Game.findById(gameId, function (err, game) {
    if(err) return next(err);
    res.json({game: game.toObject()});
  });
};
exports.create = function (req, res, next) {
  var game = new Game();
  game.save(function (err, game) {
    if(err) return next(err);
    var id = game._id;
    res.setHeader('Location', '/game/' + id);
    res.send(201, {game: game.toObject()});
  });
};
