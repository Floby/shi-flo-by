var ApplicationController = Ember.Controller.extend({
  keydown: function (event) {
    var char = String.fromCharCode(event.which).toUpperCase();
    this.set('currentKeyDown', char);
  },
  keyup: function (event) {
    this.set('currentKeyDown', null);
  }
 
});

ApplicationController.reopenClass({
  KEYCODE_J: 74
});


export default ApplicationController;
