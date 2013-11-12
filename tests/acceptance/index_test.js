import Index from 'appkit/routes/index';
import App from 'appkit/app';

var server;
module("Acceptances - Index", {
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

test("index renders", function(){
  expect(1);

  visit('/').then(function(){
    ok(exists("h1:contains('Shi-Fu-Mi')"));
  });
});

test('Show a button to create a new game', function () {
  expect(2);
  visit('/').then(function () {
    ok(exists('button#create-game'), 'button exist');
    equal($('button#create-game').text(), "New Game", 'text is invalid');
  });
});

test('Create game button creates a new Game model and redirects to /play/:play_id', function () {
  expect(1);
  server = sinon.fakeServer.create();
  server.respondWith('POST', '/game', [
    201,
    {'Content-Type': 'application/json'},
    JSON.stringify({game: {
      id: 'myGameId',
      owner: 'myTestPlayId',
      challenger: 'myChallengerPlayId'
    }})
  ]);
  visit('/').then(function () {
    click('button#create-game');
    server.respond();
    return wait();
  }).then(function () {
    var router = App.__container__.lookup('router:main');
    var url = router.get('url');
    equal(url, '/play/myTestPlayId');
  });
});

test('Create game button creates a new game and displays and link to join', function () {
  expect(2);
  server = sinon.fakeServer.create();
  server.respondWith('POST', '/game', [
    201,
    {'Content-Type': 'application/json'},
    JSON.stringify({game: {
      id: 'myGameId',
      owner: 'myTestPlayId',
      challenger: 'myChallengerPlayId'
    }})
  ]);
  visit('/').then(function () {
    click('button#create-game');
    server.respond();
    return wait();
  }).then(function () {
    var link = window.location.origin + '/#/play/myChallengerPlayId';
    ok(exists('.invite-link'), 'there should be an url to give to the challenger');
    equal(find('.invite-link', App.rootElement).text(), link);
  });
})
