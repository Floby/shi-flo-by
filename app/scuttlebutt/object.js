var Model = require('scuttlebutt/model');
var SbObject = Ember.Object.extend({
  createReadStream: function () {
    return { readable: true };
  }
});

export default SbObject;
