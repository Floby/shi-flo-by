import ScuttlebuttObject from 'appkit/scuttlebutt/object';
import Application from 'appkit/controllers/application';
import App from 'appkit/app';

var server;

module("Acceptances - Nickname", {
  setup: function(){
    App.reset();
  },
  teardown: function () {
    if(server) {
      server.restore();
      server = null;
    }
  }
});

test('The user is prompted for his nickname when creating a game', function () {
  expect(5);

  server = sinon.fakeServer.create();
  server.respondWith('POST', '/game', [
    201,
    {'Content-Type': 'application/json'},
    JSON.stringify({game: {
      id: 'myGameId',
      owner: 'myOwnerPlayId',
      challenger: 'myChallengerPlayId'
    }})
  ]);
  var scuttlebuttAdapter = App.__container__.lookup('adapter:scuttlebutt');
  var models = {};
  scuttlebuttAdapter.getModelAtUrl = function (url) {
    var model = ScuttlebuttObject.create();
    models[url] = model;
    return model;
  };

  visit('/').then(function () {
    click('button#create-game');
    server.respond();
    return wait();
  }).then(function () {
    models['/play/myOwnerPlayId/opponent'].set('id', 'myChallengerPlayId');
    models['/play/myOwnerPlayId/opponent'].set('online', false);
    return wait();
  }).then(function () {
    ok(exists('input.nickname'), 'there should be an input for the nickname');
    return fillIn('input.nickname', 'bobby');
  }).then(function () {
    ok(exists('button.save-nickname'), 'there should be a button to save the nickname');
    return click('button.save-nickname');
  }).then(function () {
    ok(find('.nickname-overlay').hasClass('hidden'), 'overlay should be hidden');
    equal('bobby', models['/play/myOwnerPlayId/me'].get('nickname'), 'nickname should be saved');
    equal('bobby', find('h2 .player-nickname').text(), 'Nickname should be displayed');
  });
});


test('The user cannot validate an empty nickname', function () {
  expect(2);

  var scuttlebuttAdapter = App.__container__.lookup('adapter:scuttlebutt');
  var models = {};
  scuttlebuttAdapter.getModelAtUrl = function (url) {
    var model = ScuttlebuttObject.create();
    models[url] = model;
    return model;
  };

  visit('/play/myPlayId').then(function () {
    return fillIn('input.nickname', '');
  }).then(function () {
    return click('button.save-nickname');
  }).then(function () {
    ok(!find('.nickname-overlay').hasClass('hidden'), 'overlay should not be hidden');
    return fillIn('input.nickname', 'Bobby');
  }).then(function () {
    return click('button.save-nickname');
  }).then(function () {
    ok(find('.nickname-overlay').hasClass('hidden'), 'overlay should be hidden');
  });
});

