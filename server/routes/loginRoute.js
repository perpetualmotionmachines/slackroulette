const express = require('express');
const router = express.Router();
const ChatsContainer = require('../../client/components/ChatsContainer');
const verifyUserController = require('../controllers/verifyUserController');

router.get('/', verifyUserController.verifyUser, (req, res) => {
    res.redirect(ChatsContainer);
});
