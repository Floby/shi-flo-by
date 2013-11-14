import KeyboardSource from 'appkit/utils/keyboardSource';

var initializer = {
  name: 'keyboardSource',
  initialize: function (container, application) {
    container.register('source:keyboard', {create: function () {
      return KeyboardSource.create({
        el: application.rootElement
      });
    }});
    container.injection('controller', 'keyboard', 'source:keyboard');
  }
};

export default initializer;

