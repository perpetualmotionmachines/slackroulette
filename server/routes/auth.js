const express = require('express');

const router = express.Router();

// extracts authentication tools out of authController
const { signup, signin, signOut } = require('../controllers/authController');
// extracts userSignupValidator
const { userSignupValidator } = require('../validator/signUpValidator');

// when POSITING to signup, run signupvalidator and then run signup(authController)
router.post('/signup', userSignupValidator, signup);
// When POSTING to signIN, run signin(authcontroller)
router.post('/signin', signin);
// when GETTING signout, run signout(authController)
router.get('/signout', signOut);

module.exports = router;
