const services = require('../services');

function addFriend(req, res){
    services.Friends.addFriend(req, res);
}

function getFriends(req, res){
    services.Friends.getFriends(req, res);
}

module.exports = {
    addFriend,
    getFriends,
}