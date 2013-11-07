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
    supertest('http://localhost:8125/')
      .get('/')
      .expect(200)
      .end(function (err, res) {
        return done(err);
      })
  });
});
