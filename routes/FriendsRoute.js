let router = require('express').Router();
const constrollers = require('../controllers');

router.post('/', constrollers.Friends.addFriend);
router.get('/', constrollers.Friends.getFriends);

module.exports = router;

