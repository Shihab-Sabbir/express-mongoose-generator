const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamp: true });

module.exports = mongoose.model('LoginSchema', LoginSchema);