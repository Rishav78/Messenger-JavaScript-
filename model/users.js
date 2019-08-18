const mongoose = require('./db');

let userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    friends: [{    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    activeChats:  [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'chats',
    }],
    phone: {
        type: String,
    },
    status: {
        type: Number,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);