import beats from 'appkit/utils/beats';

module('Utility - Beats');

test('it exists', function () {
  ok(beats, 'beats should be truthy');
  equal('function', typeof beats, 'it should be a function');
  equal(2, beats.length, 'it should have an arity of 2');
});
