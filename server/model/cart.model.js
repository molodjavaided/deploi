import mongoose from "mongoose"

import { cartItemSchema } from "./cartItem.model.js"

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    totalQuantity: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

cartSchema.pre('save', function(next) {
    // Определяем, есть ли next
    const hasNext = typeof next === 'function';

    try {
        if (!this.items || !Array.isArray(this.items)) {
            this.totalPrice = 0;
            this.totalQuantity = 0;
            return hasNext ? next() : undefined;
        }

        this.totalPrice = this.items.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);

        this.totalQuantity = this.items.reduce((total, item) => {
            return total + (Number(item.quantity) || 0);
        }, 0);

        return hasNext ? next() : undefined;

    } catch (error) {
        return hasNext ? next(error) : Promise.reject(error);
    }
});

cartSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

export const Cart = mongoose.model("Cart", cartSchema);