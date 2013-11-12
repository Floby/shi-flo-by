var mongoose = require('mongoose');
require('../lib/models/game');
var should = require('should');
var expect = require('chai').expect;
var trycatch = require('trycatch');
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
    it('should keep existing playIds for owner and challenger when they already exist', function (done) {
      var Game = mongoose.model('Game')
      var game = new Game();
      game.save(function (err, game) {
        if(err) return done(err);
        var owner = game.owner;
        var challenger = game.challenger;
        game.save(function (err, game) {
          try {
            expect(game.owner).to.equal(owner)
            expect(game.challenger).to.equal(challenger)
            done();
          } catch(e) {
            done(e);
          }
        })
      })
    });
  });

  describe('findByPlayId static method', function () {
    it('can find a game by its owner\'s playId', function (done) {
      var Game = mongoose.model('Game');
      var game = new Game();
      trycatch(function () {
        game.save(function (err, game) {
          if(err) return done(err);
          Game.findByPlayId(game.owner, function (err, g) {
            if(err) return done(err);
            expect(g._id.toString()).to.equal(game._id.toString());
            done();
          });
        });
      }, done);
    });

    it('can find a game by its challenger\'s playId', function (done) {
      var Game = mongoose.model('Game');
      var game = new Game();
      trycatch(function () {
        game.save(function (err, game) {
          if(err) return done(err);
          Game.findByPlayId(game.challenger, function (err, g) {
            if(err) return done(err);
            expect(g._id.toString()).to.equal(game._id.toString());
            done();
          });
        });
      }, done);
    });
  });
});
