const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
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
    products: {
        type: Array,
        default: []
    },
    picture: String,
    isAdmin: Boolean,
});

module.exports = mongoose.model('Owner', ownerSchema);