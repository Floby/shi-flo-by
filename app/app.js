import Resolver from 'resolver';
import router from 'appkit/router';

import scuttlebuttInitializer from 'appkit/initializers/scuttlebutt';
Ember.Application.initializer(scuttlebuttInitializer);
import leapInitializer from 'appkit/initializers/leap';
Ember.Application.initializer(leapInitializer);
import keyboardInitializer from 'appkit/initializers/keyboard';
Ember.Application.initializer(keyboardInitializer);

var Application = Ember.Application.extend({
  isMobile: function () {
    return $.browser.mobile;
  }.property(),
  isAndroid: function () {
    if(window.navigator.userAgent.match(/Android/i)) {
      return true;
    } else {
      return false;
    }
  }.property()
});

var App = Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  Router: Ember.Router.extend({
    router: router
  })
});

export default App;
