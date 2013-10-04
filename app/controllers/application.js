var ApplicationController = Ember.Controller.extend({
  init: function () {
    this.set('activeKeys', []);
  },
  currentKeyDown: function () {
    var activeKeys = this.get('activeKeys');
    var length = activeKeys.length;
    if (!length) {
      return null;
    }
    var activeKey = activeKeys[length-1];
    return activeKey;
  }.property('activeKeys.@each'),

  actions: {
    keydown: function (event) {
      var char = String.fromCharCode(event.which).toUpperCase();
      this.get('activeKeys').pushObject(char);
    },
    keyup: function (event) {
      var char = String.fromCharCode(event.which).toUpperCase();
      this.set('activeKeys', this.get('activeKeys').without(char));
    }
  }
});

ApplicationController.reopenClass({
  KEYCODE_J: 74
});


export default ApplicationController;
