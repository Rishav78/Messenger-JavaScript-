let users = require('../model/users');

function SignupServices(req, res){
    let {firstName, lastName, password, phone} = req.body;
    console.log(req.body);
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