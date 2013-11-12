var router = require('stream-router');

var controllers = require('./shoeControllers');

var router = router();
router.addRoute('/play/:play_id/me', controllers.play.me);
router.addRoute('/play/:play_id/opponent', controllers.play.opponent);

module.exports = router;
