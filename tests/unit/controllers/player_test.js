import PlayerController from 'appkit/controllers/player';

module('Player controller');

test('it exists', function () {
  ok(PlayerController);
  var controller = PlayerController.create();
});

test('it observes currentKeyDown and sets the current value on the `me` model', function () {
  var me = Ember.Object.create();
  var controller = PlayerController.create({
    container: App.__container__,
    me: me,
    currentKeyDown: null
  });
  equal('undefined', typeof me.get('currentKeyDown'));
  controller.set('currentKeyDown', 'F');
  equal('F', me.get('currentKeyDown'));
});


test('method moveFromKey detects what the currentKeyDown means', function () {
  var me = Ember.Object.create();
  var controller = PlayerController.create({
    container: App.__container__,
    me: me,
    currentKeyDown: null
  });
  equal(null, controller.moveFromKey('L'));
  equal('rock', controller.moveFromKey('R'));
  equal('paper', controller.moveFromKey('P'));
  equal('scissors', controller.moveFromKey('S'));
});