import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';
import beats from 'appkit/utils/beats';
import pathEqualsConstant from 'appkit/utils/pathEqualsConstant';

var PlayerController = Ember.ObjectController.extend({
  needs: ['application'],
  playerId: null,

  source: null,
  observeSource: function () {
    this.set('me.currentMove', this.get('source.currentMove'));
  }.observes('source.currentMove'),

  currentKeyDown: function () {
    return this.get('controllers.application.currentKeyDown') 
  }.property('controllers.application.currentKeyDown'),

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

  isRockActive: pathEqualsConstant('nowPlaying', 'rock'),
  isPaperActive: pathEqualsConstant('nowPlaying', 'paper'),
  isScissorsActive: pathEqualsConstant('nowPlaying', 'scissors'),
  isOpponentRockActive: pathEqualsConstant('opponentPlaying', 'rock'),
  isOpponentPaperActive: pathEqualsConstant('opponentPlaying', 'paper'),
  isOpponentScissorsActive: pathEqualsConstant('opponentPlaying', 'scissors'),

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
    this.get('leap.currentMove');
    this.get('currentKeyDown');
  },

  me: function () {
    var adapter = this.get('scuttlebutt');
    var url = '/' + this.get('playerId') + '/me';
    return adapter.getModelAtUrl(url);
  }.property('playerId'),

  opponent: function () {
    var adapter = this.get('scuttlebutt');
    var url = '/' + this.get('playerId') + '/opponent';
    return adapter.getModelAtUrl(url);
  }.property('playerId')
});
export default PlayerController;
