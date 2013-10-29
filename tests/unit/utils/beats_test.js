import beats from 'appkit/utils/beats';

module('Utility - Beats');

test('it exists', function () {
  ok(beats, 'beats should be truthy');
  equal('function', typeof beats, 'it should be a function');
  equal(2, beats.length, 'it should have an arity of 2');
});

test('rock does not beat rock', function () {
  equal(false, beats('rock', 'rock'));
});
test('paper does not beat paper', function () {
  equal(false, beats('paper', 'paper'));
});
test('scissors does not beat scissors', function () {
  equal(false, beats('scissors', 'scissors'));
});

test('rock beats scissors', function () {
  equal(true, beats('rock', 'scissors'));
});
test('scissors beats paper', function () {
  equal(true, beats('scissors', 'paper'));
});
test('paper beats paper', function () {
  equal(true, beats('paper', 'rock'));
});

test('paper does no beat scissors', function () {
  equal(false, beats('paper', 'scissors'));
});
test('scissors does no beat rock', function () {
  equal(false, beats('scissors', 'rock'));
});
test('rock does no beat paper', function () {
  equal(false, beats('rock', 'paper'));
});

test('anything else does not beat one of the three', function () {
  equal(false, beats('hello', 'rock'));
  equal(false, beats('hello', 'paper'));
  equal(false, beats('hello', 'scissors'));
});
