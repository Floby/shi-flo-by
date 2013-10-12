import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';

var IndexController = Ember.ArrayController.extend({
  init: function () {
    this.set('scuttlebuttAdapter', ScuttlebuttAdapter.create())
  }
});

export default IndexController;
