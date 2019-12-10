const chats = require('../model/chats');

exports.getMessages = async (req, res) => {
    const { chatid:_id, page, noOfRecords } = req.body;
    const messages = await chats.findOne({ _id }, { messages: 1 })
        .populate({
            path: 'messages',
            options: {
                sort: {
                    createdAt: -1,
                },
                skip: page*noOfRecords,
                limit: noOfRecords,
            },
            populate: {
                path: 'sender',
                select: {
                    firstName: 1,
                    lastName: 1,
                },
                
            },
        })
    res.json(messages);
}