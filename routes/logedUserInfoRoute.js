let router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.logedUserInfo.logedUserInfo);

module.exports = router;