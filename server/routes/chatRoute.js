const express = require("express");
const router = express.Router();
const models = require("../models/chatModel");

const { Chats } = models;

router.get("/", 

(req, res, next) => {

    Chats.find({}, (err, response) => {
        if (err) {
            return next({
              log: `Express error handler caught an error getting chat logs: ${err}`,
              status: 400,
              message: { err: `${err}` }
            });
        }
        else {
        console.log(response);
        return next();
        }
    }) 
},

(req, res) =>
    res.json(res.locals.response));

module.exports = router;
