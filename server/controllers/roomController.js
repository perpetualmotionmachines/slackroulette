const roomController = {};
const { chatRoom } = require('../models/roomModel');

//create a new room
roomController.createRoom = (req, res, next) => {
    console.log('in room middleware');
    const addRoom = {
        roomName: req.body.roomName,
        topic: req.body.topic
    };
    console.log('addRoom: ', addRoom);
    chatRoom.create(addRoom, (err, result) => {
        console.log('in room create');
        if (err) return next(err);
        else {
            res.locals.newRoom = result;
            next();
        }
    });
};
//populates rooms onto the page
roomController.getRooms = (req, res, next) => {
    console.log('in get rooms');
    chatRoom
        .find({})
        .exec()
        .then(results => {
            res.locals.rooms = results;
            return next();
        })
        .catch(err => {
            return next({
                log: 'Middleware error: getRooms',
                message: { err: 'error occurred' }
            });
        });
};

module.exports = roomController;
