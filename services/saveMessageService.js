const chat = require('../model/chats');
const messages = require('../model/messages');

exports.saveMessage = async (message, chatID, sender) => {
    const newMessage = new messages({ sender, message });
    newMessage.save(async (err) => {
        if(err) throw err;
        await chat.updateOne({ _id: chatID },{
            $push: { messages: newMessage._id }
        });
    });
}