const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    name: String,
    price: Number,
    bgcolor: String,
    panalcolor: String,
    textcolor: String,
    discount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);