let services = require('../services');

function login(req, res){
    services.LoginService.login(req, res);
}

function loginPage(req, res){
    if(req.isAuthenticated()) return res.redirect('/chatbox');
    return res.render('login');
}

module.exports = {
    login,
    loginPage,
}