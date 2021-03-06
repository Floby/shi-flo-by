import Resolver from 'resolver';
import router from 'appkit/router';

import scuttlebuttInitializer from 'appkit/initializers/scuttlebutt';
Ember.Application.initializer(scuttlebuttInitializer);
import leapInitializer from 'appkit/initializers/leap';
Ember.Application.initializer(leapInitializer);
import keyboardInitializer from 'appkit/initializers/keyboard';
Ember.Application.initializer(keyboardInitializer);

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  Router: Ember.Router.extend({
    router: router
  }),
  isMobile: $.browser.mobile,
  isAndroid: (/Android/i).test(navigator.userAgent)
});

App.then(function () {
  $('body .nojs-placeholder').remove();
});

export default App;
