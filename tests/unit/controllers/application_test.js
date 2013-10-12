import ApplicationController from 'appkit/controllers/application';


module('Application controller');


test('Unit - ApplicationController - class has a KEYCODE_J property', function () {
  ok(Ember.get(ApplicationController, 'KEYCODE_J') === 74, 'keycode for J is 74');
});

test('Unit - ApplicationController - takes the last available keydown character as its currentKeyDown', function () {
  expect(4);
  var controller = ApplicationController.create();
  controller.send('keydown', {which: 74});
  wait().then(function () {
    ok(controller.get('currentKeyDown') === 'J', 'current key should be J');
    controller.send('keydown', {which: 75});
    return wait();
  }).then(function () {
    ok(controller.get('currentKeyDown') === 'K', 'current key should be K');
    controller.send('keyup', {which: 75});
    return wait();
  }).then(function () {
    ok(controller.get('currentKeyDown') === null, 'current key should be null');
    controller.send('keyup', {which: 74});
    return wait();
  }).then(function () {
    ok(controller.get('currentKeyDown') === null, 'current key should be null');
  })
});
