let router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.ongoingChats.getOngoingChats);

module.exports = router;
