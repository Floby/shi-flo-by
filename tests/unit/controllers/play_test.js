import PlayController from 'appkit/controllers/play';
import App from 'appkit/app';

module('Unit - Controller - Play');

test('it exists', function () {
  ok(PlayController);
  var controller = PlayController.create({
    container: App.__container__
  });
});

test('it starts with falsey as me and opponent', function () {
  expect(2);
  var controller = PlayController.create({
    container: App.__container__
  });
  ok(!controller.get('me'));
  ok(!controller.get('opponent'));
});

test('it proxies correctly to its content for me and opponent', function () {
  expect(2);
  var me = {};
  var opponent = {};
  var controller = PlayController.create({
    container: App.__container__
  });
  controller.set('model', {me: me, opponent: opponent});
  equal(controller.get('me'), me);
  equal(controller.get('opponent'), opponent);
});


test('it observes the currentMove property of its source and sets the current value on the `me` model', function () {
  var me = Ember.Object.create();
  var source = Ember.Object.create();
  Ember.run(function () {
    var controller = PlayController.create({
      container: App.__container__,
      source: source,
      content: {
        me: me,
      }
    });
    ok(!controller.get('currentMove'));
    source.set('currentMove', 'rock');
  });
  equal(me.get('currentMove'), 'rock');
});

test('if the leap source is available it uses it as its source', function () {
  expect(2);
  var leap = Ember.Object.create();
  var keyboard = Ember.Object.create();
  var controller;
  Ember.run(function () {
    controller = PlayController.create({
      container: App.__container__,
      me: Ember.Object.create(),
      leap: leap,
      keyboard: keyboard
    });
  });
  equal(keyboard, controller.get('source'), "It should have the keybaord as source at first");
  Ember.run(function () {
    leap.set('isAvailable', true);
  });
  equal(leap, controller.get('source'), "It should have the keap as source once it is available");
});

test('Its opponentName property is the opponent\'s nickname or "opponent" if he as none', function () {
  expect(2);
  var me = Ember.Object.create();
  var opponent = Ember.Object.create();
  var controller;
  Ember.run(function () {
    controller = PlayController.create({
      container: App.__container__,
      content: {
        me: me,
        opponent: opponent
      }
    });
  });
  equal("opponent", controller.get('opponentName'), "It should have 'opponent' as default value");
  Ember.run(function () {
    opponent.set('nickname', 'Bobby');
  });
  equal("Bobby", controller.get('opponentName'), "It should show the opponent's nickname");
});
