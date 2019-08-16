const mongoose = require('./db');

let chatSchema = new mongoose.Schema({
    chatType: {
        type: Number,
    },
    chatName: {
        type: String,
    },
    chatMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages',
    }],
},{
    timestamps: true
});

module.exports = mongoose.model('chats', chatSchema);