const users = require('../model/users');
const mongoose = require('../model/db');
const chat = require('../model/chats');

function addToOngoing(chatInfo){
    const {chatName, chatType, Members, user} = chatInfo;
    // console.log(Members);
    let chatMembers = [...Members,user];
    console.log(chatMembers);
    let query = {
        chatType,
        chatMembers,
    }
    chatName && (query.chatName = chatName);
    let newchat = new chat(query);
    chat.find({
        chatMembers: chatMembers
    })
        .then((chats) => 
            chats.length === 0 || chatType === 1 ?
                newchat.save(function(err){
                    if(err) throw err;
                    users.updateMany({
                        _id: {$in: chatMembers}
                    },{
                        $push: {
                            activeChats: newchat._id,
                        }
                    })
                    .then((result) => {
                        return({
                            success: true,
                        })
                    })
                }) :
                new Promise(function(resolve,reject){
                    setTimeout(resolve({success: false}),0);
                }))
            }

module.exports = {
    addToOngoing,
}
