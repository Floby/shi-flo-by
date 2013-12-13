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

  describe('The referee of the game', function () {
    var game;
    var mdm;
    var referee;
    var owner;
    var challenger;
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
      var refStream = mdm.createStream('/play/' + game.owner + '/referee');
      var ownerStream = mdm.createStream('/play/' + game.owner + '/referee');
      var challengerStream = mdm.createStream('/play/' + game.challenger + '/referee');
      referee = new Model();
      owner = new Model();
      challenger = new Model();
      refStream.pipe(referee.createStream()).pipe(refStream);
      ownerStream.pipe(owner.createStream()).pipe(ownerStream);
      challengerStream.pipe(challenger.createStream()).pipe(challengerStream);
      done();
    });
    afterEach(function (done) {
      mdm.destroy();
      done();
    });


  });
});


