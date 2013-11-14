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

test('it observes the currentMove property of its source and sets the current value on the `me` model', function () {
  var me = Ember.Object.create();
  var source = Ember.Object.create();
  Ember.run(function () {
    var controller = PlayerController.create({
      container: App.__container__,
      me: me,
      source: source
    });
    ok(!controller.get('currentMove'));
    source.set('currentMove', 'rock');
  });
  equal(me.get('currentMove'), 'rock');
});
