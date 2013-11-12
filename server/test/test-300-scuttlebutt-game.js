var trycatch = require('trycatch');
var expect = require('chai').expect;
var supertest = require('supertest');
var initializer = require('../');
var db = require('./db');
var shoe = require('./client-mux-demux');
var Model = require('scuttlebutt/model');


var database_uri = 'mongodb://localhost/octo-fu-mi_test';

var server;

describe('Server', function () {
  //db();
  before(function (done) {
    server = initializer({
      port: 8125,
      silent: true,
      base: __dirname + '/../../tmp/public',
      database: database_uri
    });
    server.listen(8125, done);
  });
  after(function (done) {
    server.close();
    done();
  });

  describe('When a game is created,', function () {
    var game;
    before(function (done) {
      supertest(server)
        .post('/game')
        .send({game:{}})
        .end(function (err, res) {
          if(err) return done(err);
          game = res.body.game;
          done();
        });
    });
    it('a scuttlebutt stream is available for both players', function (done) {
      trycatch(function () {
        var mdm = shoe('ws://localhost:8125/shoe');
        var toTest = 2;
        testModel(game.owner);
        testModel(game.challenger);

        function testModel(id) {
          var stream = mdm.createStream('/play/' + id + '/me');
          var model = new Model();
          stream.pipe(model.createStream()).pipe(stream);
          model.once('update', function() {
            expect(model.get('id')).to.equal(id);
            if(--toTest <= 0) done();
          });
        }
      }, function (err) {
        done(err);
      });
    });

    it('exposes a scuttlebutt stream of the opponent for both players', function (done) {
      trycatch(function () {
        var mdm = shoe('ws://localhost:8125/shoe');
        var toTest = 2;
        testModel(game.owner, game.challenger);
        testModel(game.challenger, game.owner);

        function testModel(id, other) {
          var stream = mdm.createStream('/play/' + id + '/opponent');
          var model = new Model();
          stream.pipe(model.createStream()).pipe(stream);
          model.once('update', function() {
            expect(model.get('id')).to.equal(other);
            if(--toTest <= 0) done();
          });
        }
      }, function (err) {
        done(err);
      });
    });

    it('connected the challenger model to the owner\'s opponent model', function (done) {
      trycatch(function () {
        // Given
        var mdm = shoe('ws://localhost:8125/shoe');
        var ownerOpponent = new Model();
        var challenger = new Model();
        var ownerOpponentStream = mdm.createStream('/play/' + game.owner + '/opponent');
        var challengerStream = mdm.createStream('/play/' + game.challenger + '/me');
        challengerStream.pipe(challenger.createStream()).pipe(challengerStream);
        ownerOpponentStream.pipe(ownerOpponent.createStream()).pipe(ownerOpponentStream);
        var testValue = Math.random();

        // When
        challenger.set('test_field', testValue);

        // Then
        ownerOpponent.on('update', function(update) {
          var key = update[0];
          var value = update[1];
          // ignore other updates than what we expect
          if(key !== 'test_field') return;
          expect(ownerOpponent.get('test_field')).to.equal(testValue);
          done();
        });
      }, done);
    });
  });
});

