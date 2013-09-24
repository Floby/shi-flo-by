var Model = require('scuttlebutt/model');
var SbObject = Ember.Object.extend({
  init: function () {
    var model = this._scuttlebuttModel = new Model();
    var self = this;
    model.on('update', function (update, timestamp, source) {
      var key = update[0];
      var value = update[1];
      self[key] = value;
    });
  },
  setUnknownProperty: function (key, value) {
    this._scuttlebuttModel.set(key, value);
  },
  createReadStream: function () {
    Ember.assert('No scuttlebutt model was initialised on this instance', this._scuttlebuttModel);
    return this._scuttlebuttModel.createReadStream();
  },
  createWriteStream: function () {
    Ember.assert('No scuttlebutt model was initialised on this instance', this._scuttlebuttModel);
    return this._scuttlebuttModel.createWriteStream();
  }
});

export default SbObject;
