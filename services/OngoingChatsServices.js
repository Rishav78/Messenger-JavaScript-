const users = require('../model/users');

exports.getOngoingChats = async (req, res) => {
    const { _id } = req.user;
    const chats = await users.findById(_id, { activeChats: 1 })
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
                    status: 1,
                }
            },
        });
    res.json(chats.activeChats);
}