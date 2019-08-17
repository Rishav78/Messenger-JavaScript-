const users = require('../model/users');

function logedUserInfo(req, res){
    let user = req.user._id;
    users.findOne({
        _id: user
    },{password: 0,createdAt:0, updatedAt:0, friends: 0})
        .populate({
            path: 'activeChats',
            select: {
                chatName: 1,
                chatMembers: 1,
                chatType: 1,
            },
            populate: {
                path: 'chatMembers',
                select: {
                    firstName: 1,
                    lastName: 1,
                }
            },
        })
        .then((userInfo) => {
            res.json(userInfo);
        })
}

module.exports = {
    logedUserInfo,
}