const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");

router.get("/", (req, res) => {
    console.log('here');
    Chat.find({}, (err, response) => {
        if (err) {
            return next({
              log: `Express error handler caught an error getting chat logs: ${err}`,
              status: 400,
              message: { err: `${err}` }
            });
        }
        res.locals.response = response;
    }, (req, res) =>
    res.status(200).json(res.locals.response))
});

module.exports = router;
