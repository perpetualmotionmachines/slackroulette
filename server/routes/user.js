const express = require('express');

const router = express.Router();

// Extract necessary auth methods
const { requireSignin, isAuth } = require('../controllers/authController');
// extracts user methods
const { userById, read, update } = require('../controllers/userController');

// Loads a userdashboard that matches the userID passed in via the request
router.get('/user/:userId', requireSignin, isAuth, read);

// Used for updating profile within user dashboard
router.put('/user/:userId', requireSignin, isAuth, update);

// This grabs the userId from the URL params
router.param('userId', userById);

module.exports = router;
