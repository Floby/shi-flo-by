import PlayerController from 'appkit/controllers/player';

var PlayController = PlayerController.extend({
  me: Ember.computed.alias('content.me'),
  opponent: Ember.computed.alias('content.opponent')
});

export default PlayController;
