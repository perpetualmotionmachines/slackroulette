const model = require("../models/userModel");
const signupController = {};
const { User } = model;

signupController.createUser = (req, res, next) => {
  const userInfo = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  User.create(userInfo, (err, result) => {
    if (err) return err;
    return next();
  });
};

module.exports = signupController;
