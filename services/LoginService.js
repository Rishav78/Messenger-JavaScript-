const users = require('../model/users');

exports.login = async (req, res) => {
    const { phone, password } = req.body;
    const user = await users.findOne({ phone, password });
    if(!user) return res.render('login',{
        success: false,
        msg: 'User doest not exist',
    });
    console.log(user);
    if(user.status === 1) return res.redirect('/');
    const { _id } = user;
    req.login(_id, (err) => {
        if(err) return res.redirect('/');
        return res.redirect('/chatbox');
    });
}