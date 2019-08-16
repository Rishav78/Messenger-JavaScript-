let router = require('express').Router();
let controllers = require('../controllers');

router.get('/', controllers.serveHomePage.serveHomePage);

module.exports = router;