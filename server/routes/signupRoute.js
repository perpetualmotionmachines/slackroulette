const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
// const ChatsContainer = require('../../client/components/ChatsContainer');
const signupController = require('../controllers/signupController');

router.post('/', signupController.createUser, (req, res) => {
    res.redirect(ChatsContainer);
});
