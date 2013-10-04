import ScuttlebuttAdapter from 'appkit/scuttlebutt/adapter';

var PlayerController = Ember.Controller.extend({
  playerId: null,
  needs: ['application'],
  currentKeyDown: Ember.computed.alias('controllers.application.currentKeyDown'),

  observeCurrentKeyDown: function () {
    var model = this.get('me');
    var currentKeyDown = this.get('currentKeyDown');
    console.log('current key down is', currentKeyDown);
    Ember.set(model, 'currentKeyDown', currentKeyDown);
  }.observes('currentKeyDown'),

  init: function () {
    this.set('scuttlebuttAdapter', ScuttlebuttAdapter.create())
  },
  me: function () {
    var adapter = this.get('scuttlebuttAdapter')
    var url = '/' + this.get('playerId') + '/me';
    return adapter.getModelAtUrl(url);
  }.property('playerId'),

  opponent: function () {
    var adapter = this.get('scuttlebuttAdapter')
    var url = '/' + this.get('playerId') + '/opponent';
    return adapter.getModelAtUrl(url);
  }.property('playerId')
});
export default PlayerController;
