var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  player1: String,
  player2: String
});


Schema.pre('save', function (done) {
  if (typeof this.player1 === 'undefined') {
    this.player1 = 'a';
  }
  if (typeof this.player2 === 'undefined') {
    this.player2 = 'b';
  }
  done();
});

Schema.set('toObject', {
  transform: function(document, ret, options) {
    ret.id = document._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('Game', Schema);
