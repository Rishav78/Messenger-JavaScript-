const users = require('../model/users');
const mongoose = require('../model/db');
const chat = require('../model/chats');

function addToOngoing(req, res){
    const user = req.user._id;
    let {chatName, chatType, Members} = req.body;
    let chatMembers = [...Members,user];
    console.log(chatMembers);
    let newchat = new chat({
        chatType,
        chatName,
        chatMembers,
    });

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
    })
}

module.exports = {
    addToOngoing,
}