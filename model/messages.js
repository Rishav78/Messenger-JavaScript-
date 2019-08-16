const mongoose = require('./db');

let messageSchema = new mongoose.Schema({
    sender: {
        type: String,
    },
    message: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('messages', messageSchema);