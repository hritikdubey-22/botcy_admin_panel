const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const passwordUtil = require('../utils/password');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    clientName: {
        type: String,
        required: true
    }
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
        this.password = await passwordUtil.getHash(this.password);
    }
    next();
});

// compare password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = { User }; 