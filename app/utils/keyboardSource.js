var KeyboardSource = Ember.Object.extend({
  init: function () {
    var el = $(this.el);
    var self = this;
    el.keydown(function (event) { return self.onKeydown(event); });
    el.keyup(function (event) { return self.onKeyup(event); });
  },
  onKeydown: function () {
  },
  onKeyup: function () {
  }
});

export default KeyboardSource;
