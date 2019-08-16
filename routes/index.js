const router = require('express').Router();
const LoginRouter = require('./LoginRoute');
const SignupRoute = require('./SignupRoute');
const searchNewFriend = require('./SearchNewFriendRoute');
const Friends = require('./FriendsRoute');
const serveHonePage = require('./ServeHomePageRoute');
const addToOngoingChat = require('./AddOngoingChatRoute');
const ongoing = require('./AddOngoingChatRoute');
const ongoingChats = require('./OngoingChatsRoute');
const messages = require('./getMessagesRoute');
const logedUserInfo = require('./logedUserInfoRoute');

router.use('/', serveHonePage);
router.use('/login', LoginRouter);
router.use('/signup', SignupRoute);
router.use('/searchnewfriend',searchNewFriend);
router.use('/friends', Friends);
router.use('/addtoongoing', addToOngoingChat);
router.use('/ongoing', ongoing);
router.use('/ongoingchats', ongoingChats);
router.use('/messages', messages);
router.use('/logedUserInfo',logedUserInfo);

module.exports = router;
