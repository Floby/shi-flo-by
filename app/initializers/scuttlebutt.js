import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';

var initializer = {
  name: 'scuttlebutt',
  initialize: function (container, application) {
    container.register('adapter:scuttlebutt',  ScuttlebuttAdapter);
    container.injection('route', 'scuttlebutt', 'adapter:scuttlebutt');
  }
};

export default initializer;
