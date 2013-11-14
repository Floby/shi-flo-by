
var controller = new Leap.Controller();

var LeapSource = Ember.Object.extend({
  controller: controller,
  init: function () {
    var self = this;
    this.get('controller').on('deviceConnected', function() {
      self.set('offline', false);
    });
    this.get('controller').on('deviceDisconnected', function() {
      self.set('offline', true);
    });
  }
});

export default LeapSource;
