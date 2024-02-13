import mongoose from "mongoose";

export const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        default: 10
    },
    status:{
        type: Boolean,
        default: true,
    }
});

export const prodModel = mongoose.model("products", productsSchema);