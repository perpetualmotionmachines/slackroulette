const mongoose = require("mongoose");
const secret = require('../config/db.js');

const MONGO_URI = secret;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'eevee'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Chats = mongoose.model("chat", ChatSchema);

module.exports = {Chats};
