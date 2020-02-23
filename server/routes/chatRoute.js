const express = require("express");
const router = express.Router();
const chatController = require('../controllers/chatController')


router.get("/", chatController.getLogs, (req, res) =>{
        res.status(200).json(res.locals.response)});

module.exports = router;
