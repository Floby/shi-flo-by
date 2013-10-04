var ApplicationView = Ember.View.extend({
  didInsertElement: function () {
    var el = $(document);
    var self = this;
    el.keydown(this.keydown.bind(this));
    el.keyup(this.keyup.bind(this));
  },

  keyup: function (event) {
    var controller = this.container.lookup('controller:application');
    controller.send('keyup', event);
  },
  keydown: function (event) {
    var controller = this.container.lookup('controller:application');
    controller.send('keydown', event);
  }
});

export default ApplicationView;
