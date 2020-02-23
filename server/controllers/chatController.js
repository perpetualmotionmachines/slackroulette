const models = require("../models/chatModel");
const chatController = {};

const { Chats } = models;

chatController.getLogs = (req, res, next) => {
     Chats.find({}, (err, result) => {
         if (err) {
             return next(
                {
                    log: `Express error handler caught getLocations error ${err}`,
                    status: 400,
                    message: { err: `${err}` }
                  }
             )
         }
         res.locals.result = result;
         return next(); 
     });      
}

module.exports = chatController;