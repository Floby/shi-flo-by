var sha1 = require('node-sha1');
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  owner: String,
  challenger: String
});

Schema.static('findByPlayId', function (playId, callback) {
  return this.findOne({
    '$or': [
      {owner: playId},
      {challenger: playId}
    ]
  }, callback);
});


Schema.pre('save', function (done) {
  var seed = String(Date.now());
  if (typeof this.owner === 'undefined') {
    this.owner = sha1(seed + 'owner');
  }
  if (typeof this.challenger === 'undefined') {
    this.challenger = sha1(seed + 'challenger');
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
