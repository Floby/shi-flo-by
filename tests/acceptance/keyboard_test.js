import KeyboardSource from 'appkit/utils/keyboardSource';
import App from 'appkit/app';

module('Acceptances - Keyboard', {
  setup: function () {
    App.reset();
  }
});


test('keyboard source is registered in application container', function () {
  expect(2);
  var container = App.__container__;
  var source = container.lookup('source:keyboard');
  ok(source, 'Keyboard Source should be registered');
  ok(source instanceof KeyboardSource, 'it should be an instance of KeyboardSource');
});

test('keyboardmotion source is injected in controllers', function () {
  expect(2);
  var container = App.__container__;
  var controller = container.lookup('controller:play');
  var source = controller.get('keyboard');
  ok(source, 'Keyboard Source should be injected');
  ok(source instanceof KeyboardSource, 'it should be an instance of KeyboardSource');
});


