import ApplicationController from 'appkit/controllers/application';


module('Application controller');


test('Unit - ApplicationController - class has a KEYCODE_J property', function () {
  ok(Ember.get(ApplicationController, 'KEYCODE_J') === 74, 'keycode for J is 74');
})
