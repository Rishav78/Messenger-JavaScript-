let router = require('express').Router();
const auth = require('../auth/auth');
let controllers = require('../controllers');

router.get('/',
        controllers.serveHomePage.serveHomePage);

module.exports = router;