module.exports = Referee;


var Model = require('scuttlebutt/model');
var util = require('util');

function Referee (game, p1, p2) {
  if(!(this instanceof Referee)) return new Referee(game, p1, p2);
  Model.call(this);

  this.set('id', game._id);
}

util.inherits(Referee, Model);
