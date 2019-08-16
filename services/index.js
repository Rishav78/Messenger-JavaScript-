const LoginService = require('./LoginService');
const SignupService = require('./SignupService');
const searchNewFriend = require('./searchNewFriendService');
const Friends = require('./FriendsService');
const addToOngoing = require('./AddToOngoingService');
const ongoingChats = require('./OngoingChatsServices');
const getMessages = require('./getMesagesService');
const logedUserInfo = require('./logedUserInfoService');

module.exports = {
    LoginService,
    SignupService,
    searchNewFriend,
    Friends,
    addToOngoing,
    ongoingChats,
    getMessages,
    logedUserInfo,
}