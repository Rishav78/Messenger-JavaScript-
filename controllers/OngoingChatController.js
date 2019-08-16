const services = require('../services');

function getOngoingChats(req, res){
    services.ongoingChats.getOngoingChats(req, res);
}

module.exports = {
    getOngoingChats,
}