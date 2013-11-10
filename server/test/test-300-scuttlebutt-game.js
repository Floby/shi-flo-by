var trycatch = require('trycatch');
var expect = require('chai').expect;
var supertest = require('supertest');
var initializer = require('../')
var db = require('./db');
var shoe = require('./client-mux-demux');
var Model = require('scuttlebutt/model');


var database_uri = 'mongodb://localhost/octo-fu-mi_test';

var server;

describe('Server', function () {
  db();
  before(function (done) {
    server = initializer({
      port: 8125,
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
    it('a scuttlebutt stream is available for both players', function (done) {
      trycatch(function () {
        supertest(server)
          .post('/game')
          .send({game: {}})
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .expect('Location', /^\/game\/[a-zA-Z0-9]+$/)
          .end(function (err, res) {
            if(err) return done(err);
            var game = res.body.game;
            var mdm = shoe('ws://localhost:8125/shoe');
            var toTest = 2;
            testModel(game.owner);
            testModel(game.challenger)

            function testModel(id) {
              var stream = mdm.createStream('/play/' + id);
              var model = new Model();
              stream.pipe(model.createStream()).pipe(stream);
              model.on('update', function() {
                if(model.get('id') !== id) {
                  return done(new Error(model.get('id') + 'was different of ' + id))
                }
                if(--toTest <= 0) done();
              });
            };
          });
      }, function (err) {
        done(err)
      })
    });
  })
});

