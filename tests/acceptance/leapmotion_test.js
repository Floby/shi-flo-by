import LeapSource from 'appkit/utils/leapSource';
import App from 'appkit/app';

module('Acceptances - LeapMotion', {
  setup: function () {
    App.reset();
  }
});


test('leapmotion source is registered in application container', function () {
  expect(2);
  var container = App.__container__;
  var source = container.lookup('source:leap');
  ok(source, 'LeapSource should be registered');
  ok(source instanceof LeapSource, 'it should be an instance of LeapSource');
});

test('leapmotion source is injected in controllers', function () {
  expect(2);
  var container = App.__container__;
  var controller = container.lookup('controller:play');
  var source = controller.get('leap');
  ok(source, 'LeapSource should be injected');
  ok(source instanceof LeapSource, 'it should be an instance of LeapSource');
});

