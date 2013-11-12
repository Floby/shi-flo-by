import pathEqualsConstant from 'appkit/utils/pathEqualsConstant';

module('Utility - pathEqualsConstant')

test('it exists', function () {
  ok(pathEqualsConstant, 'pathEqualsConstant should be truthy');
  equal('function', typeof pathEqualsConstant, 'it should be a function');
  equal(2, pathEqualsConstant.length, 'it should have an arity of 2');
});

test('it compares a field with a constant value', function () {
  var Model = Ember.Object.extend({
    isBlue: pathEqualsConstant('color', 'blue')
  });
  var m1 = Model.create({color: 'blue'});
  var m2 = Model.create({color: 'red'});
  var m3 = Model.create();
  equal(m1.get('isBlue'), true);
  equal(m2.get('isBlue'), false);
  equal(m3.get('isBlue'), false);
});

