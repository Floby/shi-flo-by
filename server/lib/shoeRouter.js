var router = require('stream-router');

var controllers = require('./shoeControllers');

var router = router();
router.addRoute('/player1/me', controllers.player1.me);
router.addRoute('/player1/opponent', controllers.player1.opponent);
router.addRoute('/player2/me', controllers.player2.me);
router.addRoute('/player2/opponent', controllers.player2.opponent);
router.addRoute('/play/:play_id', controllers.play);

module.exports = router;
