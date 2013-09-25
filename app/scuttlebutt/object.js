var Model = require('scuttlebutt/model');

var addObserverForAttribute = function addObserverForAttribute(obj, key) {
  obj.addObserver(key, obj, function () {
    this._scuttlebuttModel.set(key, this.get(key));
  });
};

var SbObject = Ember.Object.extend({
  init: function () {
    var model = this._scuttlebuttModel = new Model();
    var self = this;
    model.on('update', function (update, timestamp, source) {
      var key = update[0];
      var value = update[1];
      Ember.run(function () {
        self.set(key, value);
      })
    });
  },

  // this method is called from Ember.set
  // which can in our case be a call from model#update or outside
  // the if branch covers the first case while the else branch 
  // covers the second
  setUnknownProperty: function (key, value) {
    if (value === this._scuttlebuttModel.get(key)) {
      this[key] = {}; // this is to fool ember into thinking this is not an unkown property
      this.set(key, value);
    }
    else {
      this._scuttlebuttModel.set(key, value);
    }
    addObserverForAttribute(this, key);
  },
  createReadStream: function () {
    Ember.assert('No scuttlebutt model was initialised on this instance', this._scuttlebuttModel);
    return this._scuttlebuttModel.createReadStream();
  },
  createWriteStream: function () {
    Ember.assert('No scuttlebutt model was initialised on this instance', this._scuttlebuttModel);
    return this._scuttlebuttModel.createWriteStream();
  },
  createStream: function () {
    Ember.assert('No scuttlebutt model was initialised on this instance', this._scuttlebuttModel);
    return this._scuttlebuttModel.createStream();
  }
});

export default SbObject;
