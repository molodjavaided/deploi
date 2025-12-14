import mongoose from "mongoose"

export const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
    type: Number,
    required: true,
    min: 0
    },
        title: {
        type: String,
        required: true
    },
        description: {
        type: String,
        default: ""
    },
        imageUrl: {
        type: String,
        default: ""
    },
        inStock: {
        type: Boolean,
        default: false
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});