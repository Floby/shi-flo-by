import PlayerController from 'appkit/controllers/player';
import App from 'appkit/app';

module('Player controller');

test('it exists', function () {
  ok(PlayerController);
  Ember.run(function () {
    var controller = PlayerController.create({
      container: App.__container__
    });
  });
});

test('it observes currentKeyDown and sets the current value on the `me` model', function () {
  var me = Ember.Object.create();
  Ember.run(function () {
    var controller = PlayerController.create({
      container: App.__container__,
      me: me,
      currentKeyDown: null
    });
    equal('undefined', typeof me.get('currentKeyDown'));
    controller.set('currentKeyDown', 'R');
  });
  equal(me.get('currentMove'), 'rock');
});


test('method moveFromKey detects what the currentKeyDown means', function () {
  var me = Ember.Object.create();
  var controller;
  Ember.run(function () {
    controller = PlayerController.create({
      container: App.__container__,
      me: me,
      currentKeyDown: null
    });
  });
  equal(null, controller.moveFromKey('L'));
  equal('rock', controller.moveFromKey('R'));
  equal('paper', controller.moveFromKey('P'));
  equal('scissors', controller.moveFromKey('S'));
});
