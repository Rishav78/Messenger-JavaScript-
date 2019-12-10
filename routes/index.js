const router = require('express').Router();

router.use('/', require('./ServeHomePageRoute'));
router.use('/login', require('./LoginRoute'));
router.use('/signup', require('./SignupRoute'));
router.use('/searchnewfriend',require('./SearchNewFriendRoute'));
router.use('/friends', require('./FriendsRoute'));
router.use('/addtoongoing', require('./AddOngoingChatRoute'));
router.use('/ongoing', require('./AddOngoingChatRoute'));
router.use('/ongoingchats', require('./OngoingChatsRoute'));
router.use('/messages', require('./getMessagesRoute'));
router.use('/logedUserInfo',require('./logedUserInfoRoute'));
router.use('/chatbox', require('./chatboxRoute'));

module.exports = router;
