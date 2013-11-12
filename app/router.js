var router = Ember.Router.map(function(){
  this.route('player1');
  this.route('player2');
  this.resource('play', { path: '/play/:play_id' });
});

export default router;
