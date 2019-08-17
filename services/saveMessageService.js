const chat = require('../model/chats');
const messages = require('../model/messages');

function saveMessage(message, chatID, sender){
    console.log(sender);
    const newMessage = new messages({
        sender,
        message,
    });
    newMessage.save(function(err){
        chat.updateOne({
            _id: chatID
        },{
            $push: {
                messages: newMessage._id,
            }
        })
            .then((a) => {
                console.log(a);
            })
    });
}

module.exports = {
    saveMessage,
}