import KeyboardSource from 'appkit/utils/keyboardSource';

var initializer = {
  name: 'keyboardSource',
  initialize: function (container, application) {
    container.register('source:keyboard', KeyboardSource);
    container.injection('controller', 'keyboard', 'source:keyboard');
  }
};

export default initializer;

