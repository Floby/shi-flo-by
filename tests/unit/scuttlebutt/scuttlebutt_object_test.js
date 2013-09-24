import SbObject from 'appkit/scuttlebutt/object';

module('Unit - Scuttlebutt - Object');


test('it exists', function () {
  ok(SbObject);
  ok(Ember.Object.detect(SbObject));
});

test('it can be instanciated', function () {
  var sbo = SbObject.create();
  ok(sbo instanceof SbObject);
});

test('it can create a readable Stream for sync', function () {
  var sbo = SbObject.create();
  ok(typeof sbo.createReadStream === 'function');
  var stream = sbo.createReadStream();
  ok(stream.readable);
});

