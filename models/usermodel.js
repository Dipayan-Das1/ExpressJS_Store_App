const mongoose = require('mongoose');
const Product = require('./productmodel')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cart:{
        products: [{
            productId:{
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        }]
    }
   
});




userSchema.methods.addToCart = function(productId) {


    return Product.findById(productId).then(product => {
        cartItm = this.cart.products.find(prod => {
            return prod.productId.toString() === productId.toString();
        });

        if(!cartItm)
        {
            cartItem = {productId: product._id,quantity: 1};    
            cartItems = [...this.cart.products,cartItem];
            this.cart.products = cartItems;
        }
        else{
            cartItm.quantity = cartItm.quantity + 1;
        }
        console.log(this.cart.products);
        return this.save();

    });   
}

userSchema.methods.deleteFromCart = function(productId){

    this.cart.products = this.cart.products.filter(item => {
        return item.productId.toString() != productId.toString();
    })

    return this.save();
}


module.exports = mongoose.model("User",userSchema);
