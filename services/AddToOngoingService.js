const users = require('../model/users');
const mongoose = require('../model/db');
const chat = require('../model/chats');

function addToOngoing(req, res){
    const user = req.user._id;
    let {chatName, chatType, Members} = req.body;
    console.log(Members);
    let chatMembers = [...Members,user];
    console.log(chatMembers);
    let query = {
        chatType,
        chatMembers,
    }
    chatName && (query.chatName = chatName);
    let newchat = new chat(query);
    chat.find({
        chatMembers: {
            $in : chatMembers,
        }
    })
        .then((chats) => {
            chats.length === 0 || chats.filter((chat) =>{
                return chat.chatMembers.length === chatMembers.length
            }).length === 0 ?
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
                        res.json({
                            success: true,
                        })
                    })
                }) :
                res.json({success: false});
        })
}

module.exports = {
    addToOngoing,
}