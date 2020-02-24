const model = require('../models/userModel');
const signupController = {};
const User = model;

signupController.createUser = (req, res, next) => {
    console.log('in create user', req.body);
    const userInfo = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    console.log('userinfo', userInfo);
    User.create(userInfo, (err, result) => {
        console.log('in create fx');
        if (err) {
            return next({
                log: 'error in sign up middleware',
                message: { err: 'err in sign up' }
            });
        } else {
            console.log('success');
            return next();
        }
    });
};

module.exports = signupController;
