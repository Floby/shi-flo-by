var Model = require('scuttlebutt/model');

var game = {
  player1: new Model(),
  player2: new Model()
};
game.player1.set('playerId', 'player1');
game.player2.set('playerId', 'player2');

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
