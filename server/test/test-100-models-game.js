var mongoose = require('mongoose');
require('../lib/models/game');
var should = require('should');
var db = require('./db');

describe('Model game', function () {
  db();

  it('exists', function () {
    var Game = mongoose.model('Game');
    Game.should.be.of.type('function');
  });

  describe('save method', function () {
    it('should create a new id for player1 and player2', function (done) {
      var Game = mongoose.model('Game');
      var game = new Game();
      game.save(function (err) {
        if(err) return done(err);
        try {
          should.notStrictEqual('undefined', typeof game.owner);
          should.notStrictEqual('undefined', typeof game.challenger);
          game.owner.should.not.equal(game.challenger);
          done();
        } catch(e) {
          done(e);
        }
      });
    });
  });
});
