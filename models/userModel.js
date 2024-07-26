const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Post'
    }],
    orders: {
        type: Array,
        default: []
    },
    picture: String,
    isAdmin: Boolean,
});

module.exports = mongoose.model('User', userSchema);