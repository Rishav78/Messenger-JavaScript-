const mongoose = require('./db');

let messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    message: {
        type: String,
    },
    status: {
        type: Number,
    },
},{
    timestamps: true
});

module.exports = mongoose.model('messages', messageSchema);