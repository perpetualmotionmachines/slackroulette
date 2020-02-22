const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const MONGO_URI = `mongodb+srv://eevee:eevee@cluster0-nphgk.mongodb.net/test?retryWrites=true&w=majority`;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch(err => console.log(err));

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