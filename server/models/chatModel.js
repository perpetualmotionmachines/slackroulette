const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
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

module.exports = Chat = mongoose.model("chat", ChatSchema);
