const chat = require('../model/chats');

function getMessages(req, res){
    let chatid = req.params.id;
    chat.findOne({
        _id: chatid,
    },{messages: 1})
        .populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: {
                    firstName: 1,
                    lastName: 1,
                },
                
            },
        })
        .then((messages) => {
            console.log(messages);
            res.json(messages);
        })
}

module.exports = {
    getMessages,
}