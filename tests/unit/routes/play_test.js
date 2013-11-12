import ScuttlebuttObject from 'appkit/scuttlebutt/object';
import Play from 'appkit/routes/play';
import App from 'appkit/app';

var route;

module("Unit - PlayRoute", {
  setup: function(){
    route = App.__container__.lookup('route:play');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Ember.Route);
});

test("its model hooks fetch models from the scuttlebutt adapter", function () {
  // Given
  route.scuttlebutt = {
    getModelAtUrl: sinon.spy(function () {
      return ScuttlebuttObject.create();
    })
  };

  // When
  var model = route.model({play_id: 'thisismyidsowhat'});

  // Then
  ok(route.scuttlebutt.getModelAtUrl.calledTwice);
  ok(route.scuttlebutt.getModelAtUrl.calledWith('/play/thisismyidsowhat/me'), 'scuttlebutt adapter should have been called');
  ok(route.scuttlebutt.getModelAtUrl.calledWith('/play/thisismyidsowhat/opponent'), 'scuttlebutt adapter should have been called');
  equal(model.id, 'thisismyidsowhat');
  ok(model.me instanceof ScuttlebuttObject);
  ok(model.opponent instanceof ScuttlebuttObject);

  route.scuttlebutt = App.__container__.lookup('adapter:scuttlebutt');
});
