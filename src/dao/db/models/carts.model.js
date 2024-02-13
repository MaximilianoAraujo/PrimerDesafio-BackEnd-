import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: []
    }
});

export const cartModel = mongoose.model("carts", cartsSchema);