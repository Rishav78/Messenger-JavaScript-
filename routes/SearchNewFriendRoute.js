let router = require('express').Router();
let controllers = require('../controllers');

router.post('/', controllers.searchNewFriend.searchNewFriend);
router.get('/', controllers.searchNewFriend.serveAddFriendPage);

module.exports = router;