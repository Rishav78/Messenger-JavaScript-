const users = require('../model/users');
const mongoose = require('../model/db');
const chats = require('../model/chats');

function buildQuery(chatInfo) {
    const { chatName, chatType, Members, user } = chatInfo;
    const chatMembers = [...Members, user];
    const query = { chatType, chatMembers };
    chatName && (query.chatName = chatName);
    return query;
}

exports.addToOngoing = async (chatInfo) => {
    const { chatType, Members, user } = chatInfo;
    const query = buildQuery(chatInfo);
    const chatMembers = [...Members, user];
    const newchat = new chats(query);
    const chat = await chats.findOne({ chatMembers: { '$all': chatMembers } });

    if(chat && chatType !== 1) return { success: false };

    let savedChat = await newchat.save();
    savedChat = await chats.populate(savedChat, {
        path: 'chatMembers',
        select: {
            firstName: 1,
            lastName: 1,
        },
    });
    await users.updateMany({ '_id': { '$in': chatMembers } },{
        '$push': { activeChats: newchat._id }
    });
    return {
        success : true,
        chat: savedChat,
    }
}
