const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

router.post("/", async (req, res) => {
  // console.log(req.body);

  const { username, password } = req.body;

  try {
    //check if user exists
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      username,
      password
    });

    //encrypt the password with bcrypt
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    //saves the new user into database
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
