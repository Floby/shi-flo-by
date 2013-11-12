var IndexRoute = Ember.Route.extend({
  actions: {
    createGame: function () {
      var router = this.get('router');
      var playRoute = this.container.lookup('route:play');
      return Ember.$.ajax('/test', {
        type: 'POST',
        dataType: 'json',
        data: {post: {}}
      }).then(function(payload) {
        var model = playRoute.model({play_id: payload.game.owner});
        return router.transitionTo('play', model);
      });
    }
  }
});

export default IndexRoute;
