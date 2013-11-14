var KeyboardSource = Ember.Object.extend({
  currentKeyDown: null,
  init: function () {
    var el = $(this.el);
    var self = this;
    el.keydown(function (event) { return self.onKeydown(event); });
    el.keyup(function (event) { return self.onKeyup(event); });
  },
  onKeydown: function (event) {
    var self = this;
    var char = String.fromCharCode(event.which).toUpperCase();
    Ember.run(function () {
      self.set('currentKeyDown', char);
    })
  },
  onKeyup: function (event) {
    var self = this;
    Ember.run(function () {
      self.set('currentKeyDown', null);
    })
  }
});

export default KeyboardSource;
