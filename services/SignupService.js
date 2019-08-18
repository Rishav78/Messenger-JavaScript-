let users = require('../model/users');

function SignupServices(req, res){
    const {firstName, lastName, password, phone} = req.body;
    const status = 0;
    users.find({
        phone
    })
        .then((user) => {
            if(user.length>0){
                res.json({success: false});
            }
            else{
                let newUser = new users({
                    firstName,
                    lastName,
                    password,
                    phone,
                    status,
                });
                newUser.save((err, insertedUser) => {
                    if(err) res.json({error: true});
                    res.json({success: true});
                });
            }
        })
}

module.exports = {
    SignupServices,
}