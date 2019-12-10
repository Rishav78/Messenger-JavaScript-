let router = require('express').Router();
const auth = require('../auth/auth');
const controllers = require('../controllers');

router.get('/', 
        auth.isAuthenticated(),
        controllers.AddToOngoingChat.serveOngoingChatPage);

router.post('/', 
        auth.isAuthenticated(),
        controllers.AddToOngoingChat.addToOngoing);

module.exports = router;

