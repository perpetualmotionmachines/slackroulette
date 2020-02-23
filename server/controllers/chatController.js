const models = require("../models/chatModel");
const chatController = {};

const { Chats } = models;

chatController.getLogs = (req, res, next) => {
    Chats.find({}, (err, response) => {
        if (err) {
            return next({
              log: `Express error handler caught an error getting chat logs: ${err}`,
              status: 400,
              message: { err: `${err}` }
            });
        }
        else {
            res.locals.response = response;
            return next();
        }
    })
}

module.exports = chatController;
