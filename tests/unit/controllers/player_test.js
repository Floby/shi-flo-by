import PlayController from 'appkit/controllers/play';
import App from 'appkit/app';

module('Play controller');

test('it exists', function () {
  ok(PlayController);
  Ember.run(function () {
    var controller = PlayController.create({
      container: App.__container__
    });
  });
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
