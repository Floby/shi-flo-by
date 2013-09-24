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

test('it can create a writeable Stream for sync', function () {
  var sbo = SbObject.create();
  ok(typeof sbo.createWriteStream === 'function');
  var stream = sbo.createWriteStream();
  ok(stream.writable);
});

test('it can receive changes from a scuttlebutt stream', function () {
  // Given
  expect(1);
  var document = require('scuttlebutt/model')();
  var get = Ember.get;
  var sbo = SbObject.create();
  document.createReadStream().pipe(sbo.createWriteStream());

  // When
  stop();
  document.set('hello', 'world');

  // Then
  setTimeout(function () {
    ok(get(sbo, 'hello') === 'world', 'object.hello should contain "world"');
    start();
  }, 10);
});

test('it can send its changes to a scuttlebutt stream', function () {
  // Given
  expect(2);
  var document = require('scuttlebutt/model')();
  var set = Ember.set;
  var sbo = SbObject.create();
  sbo.createReadStream().pipe(document.createWriteStream());

  // When
  stop();
  set(sbo, 'hello', 'world');
  window.mydoc = document;
  window.mysbo = sbo;

  // Then
  ok('world' === sbo.get('hello'), 'sbo.hello should contain "world"');
  setTimeout(function () {
    ok('world' === document.get('hello'), 'document.hello should contain "world"');
    start();
  }, 10);
});
