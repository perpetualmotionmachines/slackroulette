const roomController = {};
const { chatRoom } = require('../models/roomModel');
const { Text } = require('../models/textModel');

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
roomController.getText = (req, res, next) => {
    console.log('in get text serv');
    Text.find({})
        .exec()
        .then(results => {
            res.locals.texts = results;
            return next();
        })
        .catch(err => {
            return next({
                log: 'Middleware error: getText',
                message: { err: 'error occurred' }
            });
        });
};
roomController.sendText = (req, res, next) => {
    console.log('in send text serv');
    const textInfo = {
        text: req.body.text
    };
    Text.create(textInfo, (err, result) => {
        console.log('in text create');
        if (err) return next(err);
        else {
            res.locals.newText = result;
            next();
        }
    });
};

module.exports = roomController;
