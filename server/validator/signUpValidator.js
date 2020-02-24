/**
 * This function validates input values before passing them to the next middleware
 * The .check() methods come from the Express Validator that is set as an app.use() in server.js
 *
 *  Please see the example at: https://express-validator.github.io/docs/
 * In particular, look at the 2nd gray text area that shows how to use the 'check' function
 *
 * This validator will be used by /validator/validator.js
 *
 */
exports.userSignupValidator = (req, res, next) => {
    // validates name
    req.check('name', 'Name is required').notEmpty();
    // validates emails
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    // validates password
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    // catches validation errors
    const errors = req.validationErrors();
    // sends back error messages if they arise
    if (errors) {
        /**
         * If there are multiple errors, we only send back one at a time
         * IE: If name and password are both invalid, we only send back the name
         * Then when the user fixes that, we can send back the password error
         *
         * REFACTOR ALERT: Ideally we would actually send back all of the errors at once
         * REFACTOR ALERT: Because the frontend is iffy as of this writing, we only send one at a time
         */
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
