const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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

const bcrypt = require('bcrypt');

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

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return err;
        this.password = hash;
        return next();
    });
});

module.exports = User = mongoose.model('user', UserSchema);
