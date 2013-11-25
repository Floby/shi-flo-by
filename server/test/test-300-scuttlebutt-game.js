/*jshint expr: true*/
var trycatch = require('trycatch');
var expect = require('chai').expect;
var supertest = require('supertest');
var initializer = require('../');
var db = require('./db');
var shoe = require('./client-mux-demux');
var Model = require('scuttlebutt/model');


var database_uri = 'mongodb://localhost/octo-fu-mi_test';

var server;

describe('Scuttlebutt shoe Server', function () {
  //db();
  before(function (done) {
    server = initializer({
      port: 8125,
      silent: true,
      base: __dirname + '/../../tmp/public',
      database: database_uri,
      noConnectMongoose: true
    });
    server.listen(8125, done);
  });
  after(function (done) {
    server.close();
    done();
  });

  describe('When a game is created,', function () {
    var game;
    var mdm;
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
    beforeEach(function (done) {
      mdm = shoe('ws://localhost:8125/shoe');
      done();
    });
    afterEach(function (done) {
      mdm.destroy();
      done();
    });
    it('a scuttlebutt stream is available for both players', function (done) {
      trycatch(function () {
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

    it('connects the challenger model to the owner\'s opponent model', function (done) {
      trycatch(function () {
        // Given
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

    it('connects the owner model to the challenger\'s opponent model', function (done) {
      trycatch(function () {
        // Given
        var challengerOpponent = new Model();
        var owner = new Model();
        var challengerOpponentStream = mdm.createStream('/play/' + game.challenger + '/opponent');
        var ownerStream = mdm.createStream('/play/' + game.owner + '/me');
        ownerStream.pipe(owner.createStream()).pipe(ownerStream);
        challengerOpponentStream.pipe(challengerOpponent.createStream()).pipe(challengerOpponentStream);
        var testValue = Math.random();

        // When
        owner.set('test_field', testValue);

        // Then
        challengerOpponent.on('update', function(update) {
          var key = update[0];
          var value = update[1];
          // ignore other updates than what we expect
          if(key !== 'test_field') return;
          expect(challengerOpponent.get('test_field')).to.equal(testValue);
          done();
        });
      }, done);
    });

    it('Tells me if the current player\'s opponent is online', function (done) {
      trycatch(function () {
        var ownerStream = mdm.createStream('/play/' + game.owner + '/me');
        var ownerOpponentStream = mdm.createStream('/play/' + game.owner + '/opponent');
        var owner = new Model();
        var ownerOpponent = new Model();
        ownerStream.pipe(owner.createStream()).pipe(ownerStream);
        ownerOpponentStream.pipe(ownerOpponent.createStream()).pipe(ownerOpponentStream);

        ownerOpponent.once('change:online', function() {
          expect(ownerOpponent.get('online')).not.to.be.ok;
          var challengerStream = mdm.createStream('/play/' + game.challenger + '/me');
          var challenger = new Model();
          challengerStream.pipe(challenger.createStream()).pipe(challengerStream);
          ownerOpponent.once('change:online', function() {
            expect(ownerOpponent.get('online')).to.be.ok;
            challengerStream.end();
            ownerOpponent.once('change:online', function () {
              expect(ownerOpponent.get('online')).not.to.be.ok;
              done();
            });
          });
        });

        var challenger = new Model();
      }, done);
    });

    it('exposes a stream for the referee of the game to the owner of the game', function (done) {
      trycatch(function () {
        var refStream = mdm.createStream('/play/' + game.owner + '/referee');
        var ref = new Model();
        refStream.pipe(ref.createStream()).pipe(refStream);

        ref.on('change:id', function() {
          expect(ref.get('id')).to.equal(game.id);
          done();
        });
      }, done);
    });
  });
});

