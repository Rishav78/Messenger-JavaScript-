let services = require('../services');

function searchNewFriend(req, res){
    services.searchNewFriend.searchNewFriend(req, res);
}

function serveAddFriendPage(req, res){
    res.render('addfriends');
}

module.exports = {
    searchNewFriend,
    serveAddFriendPage,
}