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
