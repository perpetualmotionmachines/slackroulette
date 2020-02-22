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

module.exports = User = mongoose.model("user", UserSchema);
// const mongoose = require('mongoose');
// // TO DO: change crypto to bycrpt
// const crypto = require('crypto');
// const uuidv1 = require('uuid/v1');
// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             trim: true,
//             required: true,
//             maxlength: 24
//         },
//         email: {
//             type: String,
//             trim: true,
//             required: true,
//             unique: true
//         },
//         hashed_password: {
//             type: String,
//             required: true
//         },
//         about: {
//             type: String,
//             trim: true
//         },
//         salt: {
//             type: String
//         },
//         role: {
//             type: Number,
//             // 0 = basic, 1 = admin
//             default: 0
//         },
//         // order history
//         history: {
//             type: Array,
//             default: []
//         }
//     },
//     { timestamps: true }
// );
// // virtual field
// userSchema
//     .virtual('password')
//     .set(function(password) {
//         this._pasword = password;
//         this.salt = uuidv1();
//         this.hashed_password = this.encryptPassword(password);
//     })
//     .get(function() {
//         return this._pasword;
//     });
// userSchema.methods = {
//     authenticate(plainText) {
//         // encrypts the password and then checks against what was already stored
//         // NEEDS TO BE REPLACED WITH BCRYPT
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },
//     encryptPassword(password) {
//         if (!password) return '';
//         try {
//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');
//         } catch (err) {
//             return '';
//         }
//     }
// };
// // exports a mongoose model as 'User', based on our userSchema
// module.exports = mongoose.model('User', userSchema);
