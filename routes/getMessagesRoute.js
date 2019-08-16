let router = require('express').Router();
const controllers = require('../controllers');

router.get('/:id', controllers.getMessages.getMessages);

module.exports = router;
