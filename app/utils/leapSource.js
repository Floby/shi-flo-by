
var controller = new Leap.Controller();
var connecting = false;
var connected = false;
controller.on('connect', function() {
  console.log('controller connected !');
  connected = true;
});

var LeapSource = Ember.Object.extend({
  controller: controller,
  fingerCount: 0,
  online: Ember.computed.not('offline'),

  init: function () {
    var self = this;
    var onFrame = this.onFrame;
    this._frameHandler = function (frame) {
      onFrame.apply(self, arguments);
    };
    this.get('controller').on('deviceConnected', function() {
      self.set('offline', false);
    });
    this.get('controller').on('deviceDisconnected', function() {
      self.set('offline', true);
    });
    self.get('controller').on('animationFrame', self._frameHandler);
    if(connected) {
      this.set('offline', false);
    }
    else if (!connecting) {
      this.get('controller').connect();
      connecting = true;
    }
  },

  _cleanUp: function () {
    this.get('controller').removeListener('animationFrame', this._frameHandler);
  },
  destroy: function () {
    var ret = this._super();
    this.get('controller').removeListener('animationFrame', this._frameHandler);
    return ret;
  },

  onFrame: function (frame) {
    var self = this;
    if (!frame.hands || !frame.hands.length) return;
    Ember.run(function () {
      self.set('handCount', frame.hands.length);
      self.set('fingerCount', frame.fingers.length);
    });
  },

  currentMove: function () {
    if(!this.get('handCount')) return null;
    var count = this.get('fingerCount');
    if(count === 0) {
      return 'rock';
    } else if (count === 2) {
      return 'scissors';
    } else if (count > 3) {
      return 'paper';
    } else {
      return null;
    }
  }.property('fingerCount')
});

export default LeapSource;
