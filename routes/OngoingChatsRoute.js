let router = require('express').Router();
const auth = require('../auth/auth');
const controllers = require('../controllers');

router.get('/', 
        auth.isAuthenticated(),
        controllers.ongoingChats.getOngoingChats);

module.exports = router;
