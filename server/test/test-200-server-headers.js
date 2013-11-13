var expect = require('chai').expect;
var supertest = require('supertest');
var initializer = require('../');
var db = require('./db');

var database_uri = 'mongodb://localhost/octo-fu-mi_test';

var server;

describe('HTTP Server', function () {
  db();
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
    server.close(done);
  });

  it('Should remove the default X-Powered-By: Express default header', function (done) {
    supertest(server)
      .get('/')
      .end(function (err, res) {
        try {
          expect(res.headers['x-powered-by']).to.be.undefined;
          done();
        } catch(e) {
          done(e)
        }
      })
  });
});

