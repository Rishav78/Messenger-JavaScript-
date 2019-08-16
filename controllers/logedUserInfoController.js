const services = require('../services');

function logedUserInfo(req, res){
    services.logedUserInfo.logedUserInfo(req, res);
}

module.exports = {
    logedUserInfo,
}