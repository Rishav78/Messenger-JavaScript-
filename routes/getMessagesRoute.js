let router = require('express').Router();
const auth = require('../auth/auth');
const controllers = require('../controllers');

router.post('/', 
        auth.isAuthenticated(),
        controllers.getMessages.getMessages);

module.exports = router;
