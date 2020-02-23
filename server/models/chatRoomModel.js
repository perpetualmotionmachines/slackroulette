const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chat = require('./chatModel');

const ChatRoomModel = new Schema({
    roomName: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'chat'
        }
    ]
});

module.exports = Room = mongoose.model('room', ChatRoomModel);
