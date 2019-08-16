let router = require('express').Router();
let controllers = require('../controllers');

router.get('/', controllers.login.loginPage);
router.post('/', controllers.login.login);


module.exports = router;