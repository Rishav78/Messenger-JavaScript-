let router = require('express').Router();
const auth = require('../auth/auth');
let controllers = require('../controllers');

router.post('/', 
        auth.isAuthenticated(),
        controllers.searchNewFriend.searchNewFriend);

router.get('/', 
        auth.isAuthenticated(),
        controllers.searchNewFriend.serveAddFriendPage);

module.exports = router;