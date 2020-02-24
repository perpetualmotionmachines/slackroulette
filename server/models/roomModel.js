const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
    roomName: String,
    topic: String
});

const chatRoom = mongoose.model('chatRoom', chatRoomSchema);

module.exports = { chatRoom };
