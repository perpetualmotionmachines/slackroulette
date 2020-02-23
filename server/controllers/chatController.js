const models = require("../models/chatModel");
const chatController = {};

const { Chats } = models;


//test
chatController.getLogs = async (req, res, next) => {
     res.locals.result = await Chats.find({});
     return next();       
}

module.exports = chatController;