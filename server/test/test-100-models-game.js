var mongoose = require('mongoose');
require('../lib/models/game');
require('should');

describe('Model game', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/octo-fu-mi_testing', done);
  });
  after(function (done) {
    mongoose.connection.close(done);
  });

  it('exists', function () {
    var Game = mongoose.model('Game');
    Game.should.be.of.type('function');
  })
})
