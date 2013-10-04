var Model = require('scuttlebutt/model');

var helloObject = Model();
helloObject.set('hello', 'goodbye');

exports['hello'] = function (stream) {
  stream.pipe(helloObject.createStream()).pipe(stream);
};
