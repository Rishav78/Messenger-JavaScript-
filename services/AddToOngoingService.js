const users = require('../model/users');
const mongoose = require('../model/db');
const chat = require('../model/chats');

function addToOngoing(chatInfo){
    const {chatName, chatType, Members, user} = chatInfo;
    let chatMembers = [...Members,user];
    let query = {
        chatType,
        chatMembers,
    }
    chatName && (query.chatName = chatName);
    let newchat = new chat(query);
    return chat.find({
        chatMembers: chatMembers
    })
        .then(async (chats) => {
            if(chats.length === 0 || chatType === 1){
                let savedChat = await newchat.save();
                savedChat = await chat.populate(savedChat, {
                    path: 'chatMembers',
                    select: {
                        firstName: 1,
                        lastName: 1,
                    }
                });
                let a = await users.updateMany({
                    _id: {$in: chatMembers}
                },{
                    $push: {
                        activeChats: newchat._id,
                    }
                })
                return {
                    success : true,
                    chat: savedChat,
                }
            }else{
                return {
                    success: false,
                }
            }
        })
    }

module.exports = {
    addToOngoing,
}
