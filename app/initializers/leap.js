import LeapSource from 'appkit/utils/leapSource';

var initializer = {
  name: 'leapSource',
  initialize: function (container, application) {
    container.register('source:leap', LeapSource);
    container.injection('controller', 'leap', 'source:leap');
  }
};

export default initializer;
