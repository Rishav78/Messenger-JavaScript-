let services = require('../services');

function login(req, res){
   
    
    services.LoginService.LoginService(req, res);
}

function loginPage(req, res){
    req.user ? 
        res.render('chatbox') :
    res.render('login');
}

module.exports = {
    login,
    loginPage,
}