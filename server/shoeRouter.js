var controllers = require('./shoeControllers');

exports.handleStream = function handleStream(stream) {
  if (!stream.meta) {
    throw new TypeError('stream should have a meta property instead of ' + JSON.stringify(stream.meta));
  }

  var route = stream.meta.split('/');
  if (route[0] === '') {
    route.shift();
  }
  var controller = controllers;
  var fragment;
  while(fragment = route.shift()) {
    controller = controller[fragment];
  }
  return controller(stream);
}
