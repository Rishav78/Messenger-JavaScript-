let router = require('express').Router();
const auth = require('../auth/auth');
const constrollers = require('../controllers');

router.post('/', 
        auth.isAuthenticated(),
        constrollers.Friends.addFriend);


router.get('/', 
        auth.isAuthenticated(),
        constrollers.Friends.getFriends);

module.exports = router;

