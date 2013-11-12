var IndexRoute = Ember.Route.extend({
  actions: {
    createGame: function () {
      var router = this.get('router');
      var playRoute = this.container.lookup('route:play');
      return Ember.$.ajax('/game', {
        type: 'POST',
        dataType: 'json',
        data: {game: {}}
      }).then(function(payload) {
        var model = playRoute.model({play_id: payload.game.owner});
        var link = window.location.origin + '/#/play/' + payload.game.challenger;
        model.opponentUrl = link;
        return router.transitionTo('play', model);
      });
    }
  }
});

export default IndexRoute;
