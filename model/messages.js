const mongoose = require('./db');

let messageSchema = new mongoose.Schema({
    sender: {
        type: String,
    },
    msg: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('message', messageSchema);