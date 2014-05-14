module.exports = Referee;


var Model = require('scuttlebutt/model');
var util = require('util');

function Referee (game, p1, p2) {
  if(!(this instanceof Referee)) return new Referee(game, p1, p2);
  Model.call(this);

  this.p1 = p1;
  this.p2 = p2;

  this.set('id', game._id);

  this._observeOnline();
  this._updateState();
  this.on('change:state', this._startPlaying.bind(this));
  this.p1.on('change:currentMove', this._startPlaying.bind(this));
  this.p2.on('change:currentMove', this._startPlaying.bind(this));
}
util.inherits(Referee, Model);

var p = Referee.prototype;

p._observeOnline = function () {
  this.p1.on('change:online', this._updateState.bind(this));
  this.p2.on('change:online', this._updateState.bind(this));
};

p._updateState = function () {
  if(this.p1.get('online') === true && this.p2.get('online') === true) {
    this.set('state', 'playing');
  }
  else {
    this.set('state', 'waiting');
  }
}

p._startPlaying = function () {
  if(this.get('counting')) return;
  var state = this.get('state');
  if(state !== 'playing') return playLater();

  move1 = this.p1.get('currentMove');
  move2 = this.p2.get('currentMove');

  if(move1 || move2) return playLater();

  this._startCounting();
  var startPlaying = this._startPlaying.bind(this);

  function playLater() {
    setTimeout(startPlaying, 500);
  }
}

var stdDelay = 800;
p._startCounting = function () {
  var self = this;
  this.set('counting', true);
  this.set('count', 2);
  setTimeout(this.set.bind(this, 'count', 1), stdDelay*1);
  setTimeout(this.set.bind(this, 'count', 0), stdDelay*2);
  setTimeout(endOfRound, stdDelay*3);

  function endOfRound() {
    self.set('count', false);
    // here we should see who's actually won

    setTimeout(function () {
      self.set('counting', false);
      self._startPlaying();
    }, 1500);
    
  };
};
