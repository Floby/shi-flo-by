import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';
import beats from 'appkit/utils/beats';
import pathEqualsConstant from 'appkit/utils/pathEqualsConstant';

var PlayerController = Ember.ObjectController.extend({
  needs: ['application'],
  playerId: null,

  source: function () {
    var leap = this.get('leap.isAvailable');
    if(leap) {
      return this.get('leap');
    }
    else {
      return this.get('keyboard');
    }
  }.property('leap.isAvailable'),

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

  opponentName: function () {
    var nickname = this.get('opponent.nickname');
    if(nickname) {
      return nickname;
    }
    else {
      return 'opponent';
    }
  }.property('opponent.nickname'),

  actions: {
    saveNickname: function () {
      var newNickname = this.get('newNickname');
      if(!newNickname) {
        return;
      }
      this.set('me.nickname', newNickname);
    }
  }
});
export default PlayerController;
