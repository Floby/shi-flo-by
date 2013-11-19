import PlayerController from 'appkit/controllers/player';

var PlayController = PlayerController.extend({
  inviteUrl: function () {
    var playId = this.get('opponent.id');
    return window.location.origin + '/#/play/' + playId;
  }.property('opponent.id')
});

export default PlayController;
