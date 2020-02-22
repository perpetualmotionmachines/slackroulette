const model = require('../models/userModel');
const { User } = model;
const userController = {};

userController.verifyUser = (req, res, next) => {
    const checkUser = {
        username: req.body.username.toLowerCase()
    };
    User.findOne(checkUser, (err, user) => {
        // if error searching database
        if (err) return next(err);
        // if no result, redirect
        if (!user) res.redirect('/signup');
        // if successful query, compare passwords
        else {
            const password = user.get('password');
            bcrypt.compare(req.body.password, password, (err, success) => {
                // catch the error
                if (err) return next(err);
                // if password doesn't match, redirect, else next
                return !success ? res.redirect('/signup') : next();
            });
        }
    });
};

module.exports = userController;
