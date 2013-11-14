import PlayController from 'appkit/controllers/play';

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


