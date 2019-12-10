const searchNewFriend = require('./SearchNewFriendController');
const login = require('./LoginController');
const signup = require('./SignupController');
const Friends = require('./FriendsController');
const serveHomePage = require('./ServeHomePageController');
const AddToOngoingChat = require('./AddToOngoingChatController');
const ongoingChats = require('./OngoingChatController');
const getMessages = require('./getMessagesController');
const logedUserInfo = require('./logedUserInfoController');
const chatbox = require('./chatboxController');

module.exports = {
    searchNewFriend,
    login,
    signup,
    Friends,
    serveHomePage,
    AddToOngoingChat,
    ongoingChats,
    getMessages,
    logedUserInfo,
    chatbox,
};