var Model = require('scuttlebutt/model');
var Game = require('./models/game');

var game = {
  player1: new Model(),
  player2: new Model()
};
game.player1.set('playerId', 'player1');
game.player2.set('playerId', 'player2');

var models = {};
function modelFor (game, role) {
  var key = game._id + '/' + role;
  if (!models[key]) {
    var model = models[key] = new Model();
    model.set('id', game[role]);
  }
  return models[key];
}

exports.play = {
  me: function (stream, params) {
    var playId = params.play_id;
    var model = new Model();
    stream.pipe(model.createStream()).pipe(stream);

    Game.findByPlayId(playId, function (err, game) {
      var m;
      if(game.owner === playId) {
        m = modelFor(game, 'owner');
      }
      else {
        m = modelFor(game, 'challenger');
      }
      var ms = m.createStream();
      ms.pipe(model.createStream()).pipe(ms);
    });
  },
  opponent: function (stream, params) {
    var playId = params.play_id;
    var model = new Model();
    stream.pipe(model.createStream()).pipe(stream);

    Game.findByPlayId(playId, function (err, game) {
      var m;
      if(game.owner === playId) {
        m = modelFor(game, 'challenger');
      }
      else {
        m = modelFor(game, 'owner');
      }
      var ms = m.createStream();
      ms.pipe(model.createStream()).pipe(ms);
    });
  }
};
