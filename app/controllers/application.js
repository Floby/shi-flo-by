var ApplicationController = Ember.Controller.extend({
  init: function () {
    this.set('activeKeys', []);
  },
  currentKeyDown: function () {
    return this.get('activeKeys.lastObject') || null;
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
