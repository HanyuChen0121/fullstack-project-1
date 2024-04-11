const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
