const chat = require('../model/chats');

function getMessages(req, res){
    let chatid = req.params.id;
    chat.findOne({
        _id: chatid,
    },{messages: 1})
        .populate('messages')
        .populate('Members')
        .then((messages) => {
            console.log(messages);
            res.json(messages);
        })
}

module.exports = {
    getMessages,
}