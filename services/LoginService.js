let users = require('../model/users');

function LoginService(req, res){
    let {phone, password} = req.body;
    users.find({
        phone,
        password,
    })
        .then((user) => {
            console.log(user)
            if(user.length>0){ 
                let userid = user[0]._id;
                req.login(userid,(err) => {
                    if(err) return res.render('login',{
                        success: false,
                        msg: err,
                    });
                    res.render('chatbox',{
                        success: true,
                        msg: 'successfully loged in'
                    })
                });
            }else{  
                res.render('login',{
                    success: false,
                    msg: 'no user with this phone number and password exist',
                });
            }
        });
}

module.exports = {
    LoginService,
};