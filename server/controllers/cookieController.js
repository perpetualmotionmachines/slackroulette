const cookieController = {};

const models = require('../models/userModel.js');
const User = models;

//set cookie
cookieController.setCookie = (req, res, next) => {
    console.log('in cookies');
    const findUser = {
        email: req.body.email
    };
    User.findOne(findUser, (err, result) => {
        if (err)
            return next({
                log: 'error in cookie middleware',
                message: { err: 'err in cookie' }
            });
        else {
            const id = result.id;
            console.log('this is id', id);
            res.cookie = ('cookieId', id, { httpOnly: true });
            res.locals.cookie = id;
            return next();
        }
    });
};

module.exports = cookieController;
