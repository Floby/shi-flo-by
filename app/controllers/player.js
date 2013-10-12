import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';

var PlayerController = Ember.Controller.extend({
  playerId: null,
  needs: ['application'],
  currentKeyDown: Ember.computed.alias('controllers.application.currentKeyDown'),

  observeCurrentKeyDown: function () {
    var model = this.get('me');
    var currentKeyDown = this.get('currentKeyDown');
    Ember.set(model, 'currentKeyDown', currentKeyDown);
  }.observes('currentKeyDown'),

  moveFromKey: function (key) {
    switch(key) {
      case 'R': return 'rock';
      case 'P': return 'paper';
      case 'S': return 'scissors';
      default: return null;
    }
  },

  nowPlaying: function () {
    var currentKeyDown = this.get('me.currentKeyDown');
    return this.moveFromKey(currentKeyDown);
  }.property('me.currentKeyDown'),

  opponentPlaying: function () {
    var currentKeyDown = this.get('opponent.currentKeyDown');
    return this.moveFromKey(currentKeyDown);
  }.property('opponent.currentKeyDown'),

  isRockActive: function () { return this.get('nowPlaying') === 'rock' }.property('nowPlaying'),
  isPaperActive: function () { return this.get('nowPlaying') === 'paper' }.property('nowPlaying'),
  isScissorsActive: function () { return this.get('nowPlaying') === 'scissors' }.property('nowPlaying'),
  isOpponentRockActive: function () { return this.get('opponentPlaying') === 'rock' }.property('opponentPlaying'),
  isOpponentPaperActive: function () { return this.get('opponentPlaying') === 'paper' }.property('opponentPlaying'),
  isOpponentScissorsActive: function () { return this.get('opponentPlaying') === 'scissors' }.property('opponentPlaying'),

  init: function () {
    this.set('scuttlebuttAdapter', ScuttlebuttAdapter.create())
  },
  me: function () {
    var adapter = this.get('scuttlebuttAdapter')
    var url = '/' + this.get('playerId') + '/me';
    return adapter.getModelAtUrl(url);
  }.property('playerId'),

  opponent: function () {
    var adapter = this.get('scuttlebuttAdapter')
    var url = '/' + this.get('playerId') + '/opponent';
    return adapter.getModelAtUrl(url);
  }.property('playerId')
});
export default PlayerController;
