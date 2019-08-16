const chat = require('../model/chats');

function getMessages(req, res){
    let chatid = req.params.id;
    chat.findOne({
        _id: chatid,
    })
        .populate('messages')
        .populate('Members')
        .then((messages) => {
            res.json(messages);
        })
}

module.exports = {
    getMessages,
}