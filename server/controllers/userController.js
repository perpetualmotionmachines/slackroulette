const User = require('../models/userModel');
// const { errorHandler } = require('../errorhandler/dbErrorHandler');

/**
 * Exports a method that lets us find a user based on an from a param string
 * Invoked by user.js route
 *
 */
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

/**
 * REFACTOR ALERT: This method could be abandoned if we switched to bcrypt and used bcrypt.compare()
 * For now:
 * This method strips out the hashed_password and the salt before sending back the user profile
 * Security and stuff
 */
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

/**
 * This method allows for a user to update their profile
 * REFACTOR ALERT: currently this code looks like it requires the username to be updated (???)
 * REFACTOR ALERT: but the password looks optional? Probably need to review this code block or change to a patch method
 */
exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    // deconstruct the new name/password from the req.body
    const { name, password } = req.body;

    // try to find the user
    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        }
        // reassign the username to the updated one from the req.body
        user.name = name;

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            }
            // reassign the password to the updated one from the req.body
            user.password = password;
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};
