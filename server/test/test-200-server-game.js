var expect = require('chai').expect;
var supertest = require('supertest');
var initializer = require('../');
var db = require('./db');

var database_uri = 'mongodb://localhost/octo-fu-mi_test';

var server;

describe('Server', function () {
  db();
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
    server.close(done);
  });

  it('should give a HTTP 200 when requesting /', function (done) {
    supertest(server)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        return done(err);
      });
  });

  it('should send the game as json on GET /game/:id', function (done) {
    var Game = require('../lib/models/game');
    var game = new Game();
    game.save(function (err) {
      if(err) return done(err, game);
      supertest(server)
        .get('/game/' + game._id)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(function (err, res) {
          if(err) return done(err);
          try {
            var body = res.body;
            expect(body).to.include.keys('game');
            var g = body.game;
            expect(g.id).to.be.a('string');
            expect(g.id).to.equal(game._id.toString());
            done();
          } catch(e) {
            done(e);
          }
        });
    });
  });

  it('should send a 404 error when trying to GET a game with a malformed id', function (done) {
    supertest(server)
      .get('/game/helloworld') // not a HEX string
      .expect(404)
      .end(done);
  });

  it('should create a game when posting to /game', function (done) {
    supertest(server)
      .post('/game')
      .send({game: {}})
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect('Location', /^\/game\/[a-zA-Z0-9]+$/)
      .end(function (err, res) {
        if(err) return done(err);
        supertest(server)
          .get(res.headers.location)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .end(done);
      });
  });
});
