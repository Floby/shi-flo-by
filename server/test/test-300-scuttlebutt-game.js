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
    server.close(done)
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
            var mdm = shoe('ws://localhost:8125/shoe')
            mdm.on('connect', function () {
              var toConnect = 2;
              mdm.createStream('/play/' + game.owner).once('readable', onReadable(game.owner));
              mdm.createStream('/play/' + game.challenger).once('readable', onReadable(game.challenger));
              function onReadable(id) {
                return function () {
                  var stream = this;
                  var model = new Model();
                  stream.pipe(model.createStream()).pipe(stream);
                  setTimeout(function () {
                    try {
                      expect(model.get('id')).to.equal(id);
                      if(--toConnect <= 0) {
                        done();
                      }
                    } catch(e) {
                      done(e);
                    }
                  });
                }
              }
            });
          });
      }, function (err) {
        done(err)
      })
    });
  })
});

