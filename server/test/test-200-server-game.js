var expect = require('chai').expect;
var supertest = require('supertest');
var initializer = require('../')
var db = require('./db');

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

  it('should give a HTTP 200 when requesting /', function (done) {
    supertest(server)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        return done(err);
      })
  });

  it('should create a game when posting to /game', function (done) {
    supertest(server)
      .post('/game')
      .send({game: {}})
      .expect(201)
      .expect('Location', /^\/game\/[a-zA-Z0-9]?$/)
      .end(function (err, res) {
        if(err) return done(err);
        supertest(server)
          .get(res.headers.location)
          .expect(200)
          .end(done);
      });
  });
});
