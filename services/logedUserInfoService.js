const users = require('../model/users');

function logedUserInfo(req, res){
    let user = req.user._id;
    users.findOne({
        _id: user
    },{password: 0,createdAt:0, updatedAt:0})
        .populate('activeChats')
        .then((userInfo) => {
            res.json(userInfo);
        })
}

module.exports = {
    logedUserInfo,
}