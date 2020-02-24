/**
 * Makes it easier to CREATE JSON web token
 *
 * Docs: https://www.npmjs.com/package/jsonwebtoken
 *
 */
const jwt = require('jsonwebtoken');

/**
 * Makes it easier to VALIDATE/AUTHENTICATE JSON web tokens
 * Docs: https://www.npmjs.com/package/express-jwt
 * (From docs): "The JWT authentication middleware authenticates callers using a JWT.
 * If the token is valid, req.user will be set with the JSON object decoded to be used by later middleware for authorization and access control."
 */
const expressJwt = require('express-jwt');

const User = require('../models/userModel');

// reimports the .env config -- strange bug
require('dotenv').config();

const { errorHandler } = require('../errorhandler/dbErrorHandler');

/**
 * Function that stores users in database
 * Uses async/await to let bcrypt finish running in the event multiple users were trying to signup at once
 */
exports.signup = async (req, res) => {
    // destructure the user info from the request to avoid XSS vulnerabilities
    const userInfo = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    // create new user using obj above
    const user = new User(userInfo);

    // REFACTOR OPPORTUNITY: THIS COULD BE CHANGED TO A TRY/CATCH AND USE THE BCRYPT LIB INSTEAD
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // if you want to see the actual error that was shown prior to creating the errorHandler, uncomment the below line and then comment outthe errorhandler line
                // err
                err: errorHandler(err)
            });
        }
        // the below 2 are set as undefined so that they are not shown within the response, but they are still stored properly in the mongoose document
        user.salt = undefined;
        user.hased_password = undefined;
        // send the user back
        return res.json({
            user
        });
    });
};

// Invoked when user attempts to login
exports.signin = (req, res) => {
    // find user based on email
    const { email, password } = req.body;
    // find user by their email
    User.findOne({ email }, (err, user) => {
        // If error OR no user found...
        if (err || !user) {
            return res.status(400).json({
                error: 'Could not find a matching user with that email'
            });
        }
        // if user IS found, make sure email/password match using authenticate method from User Model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie/localstorage with expiry date
        res.cookie('t', token, { expire: new Date() + 900000 });
        // return response with user and token to frontend client
        // REFACTOR OPPORTUNITY -- send the token during SIGNUP as well
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

// fires signout -- removes the JWT from cookies
exports.signOut = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signed out successfully' });
};

// Middleware to validate that the JWT is valid
// userProperty is the payload it will be stored under, ie req.auth = true
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

// Prevents users from spoofing another user's id
// Checks the req.auth value to make sure it is truthy from the requireSignIn func above
exports.isAuth = (req, res, next) => {
    if (!req.profile || !req.auth || req.profile._id !== req.auth._id) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();

    // BACKUP VERSION -- The below code def works but just looks weird af
    // const user = req.profile && req.auth && req.profile._id === req.auth._id;
    // if (!user) {
    //     return res.status(403).json({
    //         error: 'Access denied'
    //     });
    // }
    // next();
};
