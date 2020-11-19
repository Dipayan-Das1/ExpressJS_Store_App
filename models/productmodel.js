const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.ObjectId,
        ref:'User',
        required: true
    }
});


module.exports = mongoose.model("Product",productSchema);