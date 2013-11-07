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

test('Document title is correct', function () {
  expect(1);
  visit('/').then(function(){
    equal(document.title, 'Octo-Fu-Mi');
  });
})
