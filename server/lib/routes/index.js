var controllers = require('../controllers');

exports.setupRoutes = function (server) {
  server.post('/game', controllers.game.create);
  server.get('/game/:game_id', controllers.game.get);
};

