import LeapSource from 'appkit/utils/leapSource';

module('Unit - LeapSource');


test('Can be instanciated', function () {
  expect(1);
  var leapSource = LeapSource.create();
  ok(leapSource instanceof Ember.Object, 'leapSource should be an ember object');
});


test('sets an online flag to false when the leap device disconnects and back to true when it connects', function () {
  expect(2);
  var callbacks = {};
  var leapSource = LeapSource.create({
    controller: {
      connect: function () {},
      on: function (event, cb) {
        callbacks[event] = cb;
      }
    }
  });
  Ember.run(function () {
    callbacks['connect']();
  });
  equal(true, leapSource.get('online'), 'device is disconnected');
  Ember.run(function () {
    callbacks['disconnect']();
  });
  equal(false, leapSource.get('online'), 'device is connected');
});

test('registers its onFrame method on the controller\'s frame event', function () {
  expect(1);
  var callbacks = {};
  var source = LeapSource.create({
    controller: {
      connect: function () {},
      on: function (event, cb) {
        callbacks[event] = cb;
      }
    },
    onFrame: function () {
      ok(true, "we have been called");
    }
  });
  Ember.run(function () {
    callbacks['connect']();
  });
  callbacks['animationFrame']();
});

test('updates its fingerCount attribute on each frame', function () {
  expect(3);
  var callbacks = {};
  var source = LeapSource.create({
    controller: {
      connect: function () {},
      on: function (event, cb) {
        callbacks[event] = cb;
      }
    }
  });
  Ember.run(function () {
    callbacks['connect']();
  });
  callbacks['animationFrame']({hands: [1], fingers: [1,2]});
  equal(2, source.get('fingerCount'), "we should see 2 fingers");
  callbacks['animationFrame']({hands: [1], fingers: [1,2,3,4]});
  equal(4, source.get('fingerCount'), "we should see 4 fingers");
  callbacks['animationFrame']({hands: [1], fingers: []});
  equal(0, source.get('fingerCount'), "we should see 0 fingers");
});

test('update its currentMove attribute depending on the finger count', function () {
  expect(4);
  var callbacks = {};
  var source = LeapSource.create({
    controller: {
      connect: function () {},
      on: function (event, cb) {
        callbacks[event] = cb;
      }
    }
  });
  Ember.run(function () {
    callbacks['connect']();
  });
  callbacks['animationFrame']({hands: [1], fingers: [1,2]});
  equal('scissors', source.get('currentMove'), "we should read Scissors");
  callbacks['animationFrame']({hands: [1], fingers: [1,2,3,4]});
  equal('paper', source.get('currentMove'), "we should read Paper");
  callbacks['animationFrame']({hands: [1], fingers: []});
  equal('rock', source.get('currentMove'), "we should read Rock");
  callbacks['animationFrame']({hands: [1], fingers: [1,2,3,4,5]});
  equal('paper', source.get('currentMove'), "we should read Paper");
});

