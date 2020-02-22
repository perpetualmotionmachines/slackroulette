const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return err;
    this.password = hash;
    return next();
  });
});

module.exports = User = mongoose.model("user", UserSchema);
