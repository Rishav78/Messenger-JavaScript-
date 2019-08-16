const users = require('../model/users');

function getOngoingChats(req, res){
    const user = req.user._id;
    users.findOne({
        _id: user
    },{activeChats: 1})
        .populate('activeChats')
        .then((chats) => {
            res.json(chats.activeChats);
        })
}

module.exports = {
    getOngoingChats,
}