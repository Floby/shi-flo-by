var PlayRoute = Ember.Route.extend({
  model: function (params) {
    return {
      id: params.play_id,
      me: this.scuttlebutt.getModelAtUrl('/play/' + params.play_id + '/me'),
      opponent: this.scuttlebutt.getModelAtUrl('/play/' + params.play_id + '/opponent'),
      referee: this.scuttlebutt.getModelAtUrl('/play/' + params.play_id + '/referee')
    };
  }
});

export default PlayRoute;
