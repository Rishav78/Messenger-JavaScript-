let services = require('../services');

function login(req, res){
    services.LoginService.login(req, res);
}

async function loginPage(req, res){
    if(req.isAuthenticated()) {
        const status = await services.LoginService.status(req, res);
        if(status === 1) return res.redirect('/');
        return res.redirect('/chatbox');
    }
    return res.render('login');
}

module.exports = {
    login,
    loginPage,
}