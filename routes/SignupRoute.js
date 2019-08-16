let router = require('express').Router();
let controllers = require('../controllers');

router.get('/', controllers.signup.serveSignupPage);
router.post('/', controllers.signup.signup);

module.exports = router;