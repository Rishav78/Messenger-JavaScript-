const router = require('express').Router();
const auth = require('../auth/auth');
const controllers = require('../controllers');

router.get('/',
        auth.isAuthenticated(),
        controllers.chatbox.serveChatboxPage);

module.exports = router;