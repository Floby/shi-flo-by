var ApplicationView = Ember.View.extend({
  didInsertElement: function () {
    var el = $(document);
    var self = this;
    el.keydown(function (event) { return self.keydown(event); });
    el.keyup(function (event) { return self.keyup(event); });
  },

  keyup: function (event) {
    var controller = this.container.lookup('controller:application');
    Ember.run(function () {
      try {
        controller.send('keyup', event);
      } catch(e) {}
    });
  },
  keydown: function (event) {
    var controller = this.container.lookup('controller:application');
    Ember.run(function () {
      try {
        controller.send('keydown', event);
      } catch(e) {}
    });
  }
});

export default ApplicationView;
