import LeapSource from 'appkit/utils/leapSource';

module('Unit - LeapSource');


test('Can be instanciated', function () {
  expect(1);
  var leapSource = LeapSource.create();
  ok(leapSource instanceof Ember.Object, 'leapSource should be an ember object');
});

test('does not have an offline attribute at creation time', function () {
  expect(1);
  var leapSource = LeapSource.create();
  equal(typeof leapSource.get('offline'), 'undefined');
});

test('sets an offline flag to true when the leap device disconnects and back to false when it connects', function () {
  expect(2);
  var callbacks = {};
  var leapSource = LeapSource.create({
    controller: {
      on: function (event, cb) {
        callbacks[event] = cb;
      }
    }
  });
  Ember.run(function () {
    callbacks['deviceDisconnected']();
  });
  equal(true, leapSource.get('offline'), 'device is disconnected');
  Ember.run(function () {
    callbacks['deviceConnected']();
  });
  equal(false, leapSource.get('offline'), 'device is connected');
});
