import KeyboardSource from 'appkit/utils/keyboardSource';

module('Unit - KeyboardSource');


test('Can be instanciated', function () {
  expect(1);
  var keyboardSource = KeyboardSource.create({
    el: document.body
  });
  ok(keyboardSource instanceof Ember.Object, 'keyboardSource should be an ember object');
});

test('Attaches listens to touch events on the DOM elements it is attached to', function () {
  expect(2);
  var el = document.createElement('div');
  var source = KeyboardSource.create({
    el: el,
    onKeyup: sinon.spy(),
    onKeydown: sinon.spy(),
  });

  var event = jQuery.Event('keydown');
  event.which = 74;
  $(el).trigger(event);

  event = jQuery.Event('keyup');
  event.which = 74;
  $(el).trigger(event);

  ok(source.onKeydown.calledOnce, "onKeydown should have been called once");
  ok(source.onKeyup.calledOnce, "onKeyup should have been called once");
});

test('has a currentKeyDown attribute synced with keyboard events', function () {
  expect(2);
  var el = document.createElement('div');
  var source = KeyboardSource.create({
    el: el
  });

  var event = jQuery.Event('keydown');
  event.which = 74;
  $(el).trigger(event);

  equal('J', source.get('currentKeyDown'));

  event = jQuery.Event('keyup');
  event.which = 74;
  $(el).trigger(event);

  equal(null, source.get('currentKeyDown'));
});

test('computes a currentMove property from the currentKeyDown', function () {
  expect(4);
  var el = document.createElement('div');
  var source = KeyboardSource.create({
    el: el
  });

  Ember.run(function () {
    source.set('currentKeyDown', 'R');
  });
  equal('rock', source.get('currentMove'));

  Ember.run(function () {
    source.set('currentKeyDown', 'P');
  });
  equal('paper', source.get('currentMove'));

  Ember.run(function () {
    source.set('currentKeyDown', 'S');
  });
  equal('scissors', source.get('currentMove'));

  Ember.run(function () {
    source.set('currentKeyDown', 'J');
  });
  equal(null, source.get('currentMove'));

});
