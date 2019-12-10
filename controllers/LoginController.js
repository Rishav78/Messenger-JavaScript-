let services = require('../services');

async function login(req, res){
    const { phone, password } = req.body;
    const valid = await services.LoginService.login(phone, password);
    if(!valid.success) return res.redirect('/');
    const { _id } = valid;
    req.login(_id, (err) => {
        if(err) return { success: false };
        return res.redirect('/chatbox');
    });
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