let router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.AddToOngoingChat.serveOngoingChatPage);
router.post('/', controllers.AddToOngoingChat.addToOngoing);

module.exports = router;

