import PlayerController from 'appkit/controllers/player';

var PlayController = PlayerController.extend({
  me: Ember.computed.alias('content.me'),
  opponent: Ember.computed.alias('content.opponent'),
  inviteUrl: function () {
    var playId = this.get('opponent.id');
    return window.location.origin + '/#/play/' + playId;
  }.property('opponent.id')
});

export default PlayController;
