const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        productData:{type: Object, required: true},
        quantity: {type: Number, required:true}
    }],
    price:{
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Order',orderSchema);
