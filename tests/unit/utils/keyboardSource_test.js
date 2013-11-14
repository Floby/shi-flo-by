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

