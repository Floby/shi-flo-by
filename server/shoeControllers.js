var Model = require('scuttlebutt/model');

var helloObject = Model();
helloObject.set('hello', 'goodbye');

exports['hello'] = function (stream) {
  stream.pipe(helloObject.createStream()).pipe(stream);
};

var game = {
  player1: new Model(),
  player2: new Model()
};

exports['player1'] = {
  me: function (stream) {
    var model = game.player1;
    stream.pipe(model.createStream()).pipe(stream);
  },
  opponent: function (stream) {
    var model = game.player2;
    stream.pipe(model.createStream()).pipe(stream);
  }
};

exports['player2'] = {
  me: function (stream) {
    var model = game.player2;
    stream.pipe(model.createStream()).pipe(stream);
  },
  opponent: function (stream) {
    var model = game.player1;
    stream.pipe(model.createStream()).pipe(stream);
  }
};
