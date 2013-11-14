import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';
import beats from 'appkit/utils/beats';
import pathEqualsConstant from 'appkit/utils/pathEqualsConstant';

var PlayerController = Ember.ObjectController.extend({
  needs: ['application'],
  playerId: null,

  source: function () {
    return this.get('keyboard');
  }.property(),

  observeSource: function () {
    this.set('me.currentMove', this.get('source.currentMove'));
  }.observes('source.currentMove'),

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
    this.get('source.currentMove');
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
