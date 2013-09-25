import ScuttlebuttObject from 'appkit/scuttlebutt/object';
import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';

var stream = require('stream');

var getMockForShoe = function() {
  return function (endpoint) {
    return {
      createStream: sinon.spy(function () {
        return new stream();
      })
    };
  }
};

var Adapter = ScuttlebuttAdapter.extend({
  shoe: getMockForShoe()
});

module('Unit - Scuttlebutt - Adapter');

test('it exists', function () {
  ok(Adapter);
});

test('instances have a "shoe" attribute', function () {
  var adapter = Adapter.create();
  ok(adapter.shoe);
});
test('instances have a "mdm" attribute', function () {
  var adapter = Adapter.create();
  ok(adapter.shoe);
});


test('instances have a getModelAtUrl() method', function () {
  var adapter = Adapter.create();
  ok(adapter.getModelAtUrl);
  ok('function' === typeof adapter.getModelAtUrl);
});

test('calling getModelAtUrl returns a ScuttlebuttObject', function () {
  var adapter = Adapter.create();
  var model = adapter.getModelAtUrl('/my-url');
  ok(model instanceof ScuttlebuttObject);
});

test('calling getModelAtUrl delegates call to mux-demux-shoe', function () {
  var adapter = Adapter.create();
  var model = adapter.getModelAtUrl('/my-url');
  ok(adapter.mdm.createStream.called);
});
