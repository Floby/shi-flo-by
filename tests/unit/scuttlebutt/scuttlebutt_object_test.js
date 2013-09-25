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

test('it can create a duplex Stream for sync', function () {
  var sbo = SbObject.create();
  ok(typeof sbo.createStream === 'function');
  var stream = sbo.createStream();
  ok(stream.readable);
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

  // Then
  ok('world' === sbo.get('hello'), 'sbo.hello should contain "world"');
  setTimeout(function () {
    ok('world' === document.get('hello'), 'document.hello should contain "world"');
    start();
  }, 10);
});


test('it can update changes to attributes to a scuttlebutt stream', function () {
  // Given
  expect(4);
  var document = require('scuttlebutt/model')();
  var set = Ember.set;
  var sbo = SbObject.create();
  sbo.createReadStream().pipe(document.createWriteStream());

  // When
  stop();
  set(sbo, 'hello', 'world');

  // Then
  ok('world' === sbo.get('hello'), 'sbo.hello should contain "world"');
  setTimeout(function () {
    ok('world' === document.get('hello'), 'document.hello should contain "world"');
    set(sbo, 'hello', 'goodbye');
    ok('goodbye' === sbo.get('hello'), 'sbo.hello should contain "goodbye"');
  }, 10);
  setTimeout(function () {
    ok('goodbye' === document.get('hello'), 'document.hello should contain "goodbye"');
    start();
  }, 20);
});

test('it can update a property initiliazed from scuttlebutt', function () {
  // Given
  expect(4);
  var document = require('scuttlebutt/model')();
  var sbo = SbObject.create();
  sbo.createReadStream().pipe(document.createWriteStream());
  document.createReadStream().pipe(sbo.createWriteStream());

  // When
  stop();
  document.set('hello', 'world');

  // Then
  ok('world' === document.get('hello'), 'sbo.hello should contain "world"');
  setTimeout(function () {
    ok('world' === sbo.get('hello'), 'document.hello should contain "world"');
    sbo.set('hello', 'goodbye');
    ok('goodbye' === sbo.get('hello'), 'sbo.hello should contain "goodbye"');
  }, 10);
  setTimeout(function () {
    ok('goodbye' === document.get('hello'), 'document.hello should contain "goodbye"');
    start();
  }, 20);
});

test('it can receive updates of a property initiliazed from it through scuttlebutt', function () {
  // Given
  expect(4);
  var document = require('scuttlebutt/model')();
  var sbo = SbObject.create();
  sbo.createReadStream().pipe(document.createWriteStream());
  document.createReadStream().pipe(sbo.createWriteStream());

  // When
  stop();
  sbo.set('hello', 'world');

  // Then
  ok('world' === sbo.get('hello'), 'sbo.hello should contain "world"');
  setTimeout(function () {
    ok('world' === document.get('hello'), 'document.hello should contain "world"');
    document.set('hello', 'goodbye');
    ok('goodbye' === document.get('hello'), 'sbo.hello should contain "goodbye"');
  }, 10);
  setTimeout(function () {
    ok('goodbye' === sbo.get('hello'), 'document.hello should contain "goodbye"');
    start();
  }, 20);
});
