const users = require('../model/users');

function logedUserInfo(req, res){
    let user = req.user._id;
    users.findOne({
        _id: user
    },{password: 0})
        .then((userInfo) => {
            res.json(userInfo);
        })
}

module.exports = {
    logedUserInfo,
}