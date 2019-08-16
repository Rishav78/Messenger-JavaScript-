const services = require('../services');

function getMessages(req, res){
    services.getMessages.getMessages(req, res);
}

module.exports = {
    getMessages,
}