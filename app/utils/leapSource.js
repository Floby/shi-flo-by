
var controller = new Leap.Controller();

var LeapSource = Ember.Object.extend({
  controller: controller,
  online: Ember.computed.not('offline'),

  init: function () {
    var self = this;
    this.get('controller').on('deviceConnected', function() {
      self.set('offline', false);
    });
    this.get('controller').on('deviceDisconnected', function() {
      self.set('offline', true);
    });
    this.get('controller').on('animationFrame', function(frame) {
      self.onFrame(frame);
    });
  },

  onFrame: function (frame) {
    Ember.run(this, function () {
      this.set('fingerCount', frame.fingers.length);
    });
  },

  currentMove: function () {
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
