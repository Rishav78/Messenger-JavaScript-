let router = require('express').Router();
const controllers = require('../controllers');

router.post('/', controllers.getMessages.getMessages);

module.exports = router;
