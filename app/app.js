import Resolver from 'resolver';
import router from 'appkit/router';

import scuttlebuttInitializer from 'appkit/initializers/scuttlebutt';
Ember.Application.initializer(scuttlebuttInitializer);
import leapInitializer from 'appkit/initializers/leap';
Ember.Application.initializer(leapInitializer)

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  Router: Ember.Router.extend({
    router: router
  })
});

export default App;
