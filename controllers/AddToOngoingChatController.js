const services = require('../services');

function serveOngoingChatPage(req, res){
    res.render('addToOngoingChats');
}

function addToOngoing(req, res){
    services.addToOngoing.addToOngoing(req, res);
}

module.exports = {
    serveOngoingChatPage,
    addToOngoing,
};