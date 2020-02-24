const model = require('../models/chatRoomModel');
const { Room } = model;
const createRoomController = {};

createRoomController.createRoom = (req, res, next) => {
    //takes roomname and topic from request body and uses Room schema to create a new collection in the database
    const { roomName, topic } = req.body;
    const newRoom = {
        roomName,
        topic
    };
    Room.create(newRoom, (err, result) => {
        if (err) return err;
        return next();
    });
};
module.exports = createRoomController;
