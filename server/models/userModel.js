const mongoose = require('mongoose');
// crypto lib, similar to bcrypt
const crypto = require('crypto');

const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

/**
 * Virtual mongoose field -- https://mongoosejs.com/docs/tutorials/virtuals.html
 * Takes the password in and then creates an encrypted password
 * REFACTOR ALERT: This bit would not be necessary if using userSchema.pre and bcrypt library
 */
userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

/**
 * built in methods that WILL be invoked outside this file
 * IE: User.authenticate or User.encryptPassword
 */

userSchema.methods = {
    authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);
