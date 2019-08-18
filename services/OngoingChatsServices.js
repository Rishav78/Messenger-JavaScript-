const users = require('../model/users');

function getOngoingChats(req, res){
    const user = req.user._id;
    users.findOne({
        _id: user
    },{activeChats: 1})
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
        .then((chats) => {
            res.json(chats.activeChats);
        })
}

module.exports = {
    getOngoingChats,
}