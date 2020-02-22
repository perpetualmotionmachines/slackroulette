const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const signupController = require('../controllers/signupController');

router.post('/', signupController.createUser, (req, res) => {
    res.json({});
});
