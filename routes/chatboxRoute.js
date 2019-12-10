const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.chatbox.serveChatboxPage);

module.exports = router;