import Application from 'appkit/controllers/application';
import App from 'appkit/app';

module("Acceptances - Index", {
  setup: function(){
    App.reset();
  }
});

test('Application controller reacts to keydown and keyup events for letters', function () {
  expect(2);

  visit('/').then(function () {
    var press = jQuery.Event('keydown');
    press.which = Application.KEYCODE_J;
    $('#ember-testing > .ember-view').trigger(press);
    return wait();
  }).then(function () {
    var application = App.__container__.lookup('controller:application');
    ok(application.get('currentKeyDown') === 'J', 'The application controller should have detected we pressed J');
    var event = jQuery.Event('keyup');
    event.which = Application.KEYCODE_J;
    $('#ember-testing > .ember-view').trigger(event);
    return wait();
  }).then(function () {
    var application = App.__container__.lookup('controller:application');
    ok(application.get('currentKeyDown') === null, 'The application controller should detected we stopped pressing the J key');
  })
})
