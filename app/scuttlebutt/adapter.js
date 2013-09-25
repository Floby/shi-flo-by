import ScuttlebuttObject from 'appkit/scuttlebutt/object';
var shoe = require('mux-demux-shoe');

var ScuttlebuttAdapter = Ember.Object.extend({
  shoe: shoe,
  endpoint: '/shoe',
  mdm: null,
  init: function () {
    this.set('mdm', this.get('shoe')(this.get('endpoint')));
  },
  getModelAtUrl: function (url) {
    var model = ScuttlebuttObject.create();
    var mdm = this.get('mdm');
    var stream = mdm.createStream(url);
    stream.pipe(model.createStream()).pipe(stream);
    return model;
  }
});

export default ScuttlebuttAdapter;
