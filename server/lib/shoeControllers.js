var Model = require('scuttlebutt/model');
var Game = require('./models/game');

var game = {
  player1: new Model(),
  player2: new Model()
};
game.player1.set('playerId', 'player1');
game.player2.set('playerId', 'player2');

exports.play = {
  me: function (stream, params) {
    var playId = params.play_id;
    var model = new Model();
    stream.pipe(model.createStream()).pipe(stream);
    Game.findByPlayId(playId, function (err, game) {
      if(err) throw err;
      if(game.owner === playId) {
        model.set('id', game.owner);
      }
      else {
        model.set('id', game.challenger);
      }
    });
  },
  opponent: function (stream, params) {
    var playId = params.play_id;
    var model = new Model();
    stream.pipe(model.createStream()).pipe(stream);
    Game.findByPlayId(playId, function (err, game) {
      if(err) throw err;
      if(game.owner === playId) {
        model.set('id', game.challenger);
      }
      else {
        model.set('id', game.owner);
      }
    });
  }
};

exports['player1'] = {
  me: function (stream) {
    var model = game.player1;
    stream.pipe(model.createStream()).pipe(stream);
  },
  opponent: function (stream) {
    var model = game.player2;
    stream.pipe(model.createStream({writeable: false, sendClock: true})).pipe(stream);
  }
};

exports['player2'] = {
  me: function (stream) {
    var model = game.player2;
    stream.pipe(model.createStream()).pipe(stream);
  },
  opponent: function (stream) {
    var model = game.player1;
    stream.pipe(model.createStream({writeable: false, sendClock: true})).pipe(stream);
  }
};
