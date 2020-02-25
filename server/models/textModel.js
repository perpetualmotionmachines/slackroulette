const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    text: String
});

const Text = mongoose.model('text', textSchema);

module.exports = { Text };
