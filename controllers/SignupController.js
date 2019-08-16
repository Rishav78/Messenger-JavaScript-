let services = require('../services');

function signup(req, res){
    services.SignupService.SignupServices(req, res);
}

function serveSignupPage(req, res){
    res.render('signup')
}

module.exports = {
    signup,
    serveSignupPage,
}