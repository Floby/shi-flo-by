import Index from 'appkit/routes/index';
import App from 'appkit/app';

module("Acceptances - Index", {
  setup: function(){
    App.reset();
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
  visit('/').then(function () {
    return click('button#create-game');
  }).then(function () {
    var router = App.__container__.lookup('router:main');
    var url = router.get('url');
    equal(url, '/play/myTestPlayId');
  });
});
