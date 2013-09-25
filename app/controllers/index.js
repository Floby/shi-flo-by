import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';

var IndexController = Ember.ArrayController.extend({
  init: function () {
    this.set('scuttlebuttAdapter', ScuttlebuttAdapter.create())
  },
  synchronizedModel: function () {
    return this.get('scuttlebuttAdapter').getModelAtUrl('/hello');
  }.property()
});

export default IndexController;
