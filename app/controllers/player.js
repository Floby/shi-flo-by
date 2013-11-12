import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';
import beats from 'appkit/utils/beats';

var PlayerController = Ember.Controller.extend({
  needs: ['application'],
  playerId: null,
  meUrl: function () {
    return '/play/' + this.get('playerId') + '/me';
  }.property('playerId'),

  opponentUrl: function () {
    return '/play/' + this.get('playerId') + '/opponent';
  }.property('playerId'),

  currentKeyDown: Ember.computed.alias('controllers.application.currentKeyDown'),

  observeCurrentKeyDown: function () {
    var model = this.get('me');
    var currentKeyDown = this.get('currentKeyDown');
    Ember.set(model, 'currentKeyDown', currentKeyDown);
    Ember.set(model, 'currentMove', this.moveFromKey(currentKeyDown));
  }.observes('currentKeyDown'),

  moveFromKey: function (key) {
    switch(key) {
      case 'R': return 'rock';
      case 'P': return 'paper';
      case 'S': return 'scissors';
      default: return null;
    }
  },

  nowPlaying: Ember.computed.alias('me.currentMove'),
  opponentPlaying: Ember.computed.alias('opponent.currentMove'),

  isRockActive: function () { return this.get('nowPlaying') === 'rock'; }.property('nowPlaying'),
  isPaperActive: function () { return this.get('nowPlaying') === 'paper'; }.property('nowPlaying'),
  isScissorsActive: function () { return this.get('nowPlaying') === 'scissors'; }.property('nowPlaying'),
  isOpponentRockActive: function () { return this.get('opponentPlaying') === 'rock'; }.property('opponentPlaying'),
  isOpponentPaperActive: function () { return this.get('opponentPlaying') === 'paper'; }.property('opponentPlaying'),
  isOpponentScissorsActive: function () { return this.get('opponentPlaying') === 'scissors'; }.property('opponentPlaying'),

  beats: beats,

  isWinning: function () {
    return this.beats(this.get('nowPlaying'), this.get('opponentPlaying'));
  }.property('nowPlaying', 'opponentPlaying'),

  isLosing: function () {
    return this.beats(this.get('opponentPlaying'), this.get('nowPlaying'));
  }.property('nowPlaying', 'opponentPlaying'),

  isDraw: function () {
    return this.get('nowPlaying') === this.get('opponentPlaying') && this.get('nowPlaying');
  }.property('nowPlaying', 'opponentPlaying'),

  init: function () {
    this.set('scuttlebuttAdapter', ScuttlebuttAdapter.create());
  },
  me: function () {
    var adapter = this.get('scuttlebuttAdapter');
    var url = '/' + this.get('playerId') + '/me';
    return adapter.getModelAtUrl(url);
  }.property('playerId'),

  opponent: function () {
    var adapter = this.get('scuttlebuttAdapter');
    var url = '/' + this.get('playerId') + '/opponent';
    return adapter.getModelAtUrl(url);
  }.property('playerId')
});
export default PlayerController;
