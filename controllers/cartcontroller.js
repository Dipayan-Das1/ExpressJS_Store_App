const Product = require('../models/productmodel');
const User = require('../models/usermodel');
const Order = require('../models/ordermodel');

const ObjectId = require('mongodb').ObjectID;


 module.exports.getCartDetails = (req,res,next) => {
    let user = User.getCart(req.user).then(user => {
        let cartDtls;
        
            if(user.cart)
            {
                let cartItems = user.cartItems;
                
                user.cart.forEach(element => {
                    let cartItem = cartItems.find(item => 
                        {
                            let match = element.productId.toString() === item._id.toString();
                            return match;
                        });
                     
                    if(cartItem)
                    {    
                        cartItem.quantity = element.quantity;
                    }
                    
                });
                cartDtls = {products : user.cartItems,price : getCartPrice(user.cartItems)};
            }
            else
            {
                cartDtls = {products : [],price : 0};
            }
        

        res.render("customer/cart",{pageTitle:'Customer Cart',path:'/cart',cart:cartDtls});
    });
        
}

const getCartPrice = (products) => {
let cartPrice = 0;
products.forEach(prod => {
    let quantity = parseInt(prod.quantity);
    let price = parseInt(prod.price);
    cartPrice = cartPrice + (quantity * price);
});
return cartPrice;
}


module.exports.processOrder = (req,res,next) => {

    console.log("price is "+req.body.price);    

    let user = User.getCart(req.user).then(user => {
        let cartDtls;
        
            if(user.cart)
            {
                let cartItems = user.cartItems;
                
                user.cart.forEach(element => {
                    let cartItem = cartItems.find(item => 
                        {
                            let match = element.productId.toString() === item._id.toString();
                            return match;
                        });
                     
                    if(cartItem)
                    {    
                        cartItem.quantity = element.quantity;
                    }
                    
                });
                cartDtls = {products : user.cartItems,price : req.body.price};
            }

          return cartDtls;
    }).then(cart => {
        let order;
        if(cart)
        {
            order = new Order(cart.products,cart.price,req.user);
            return order    
        }
        else{
            res.redirect("/");
        }
    }).then(order => {     
        return order.save();
    }).then(data => {
        if(data.insertedId)
        {
            console.log("clear cart");
            return User.clearCart(req.user);
        }
        else
        {
            res.render("/cart");
        }
    }).then(data => {
        res.redirect("/orders");
    });   
}


module.exports.orders = (req,res,next) => {
    Order.getOrder(req.user).then(orders => {
        console.log(orders);
        res.render("customer/orders",{pageTitle:'Customer Orders',path:'/orders',orders:orders});       
    }).catch(err => {
        console.log(err);
        res.redirect("/");
    });
    
    
    
}
 


module.exports.addToCart = (req,res,next) => {    
    let productId = req.body.productId;

    User.addToCart(req.user,productId).then(cart => {
            console.log(cart);
            res.redirect("/cart"); 
        });
}


module.exports.deleteFromCart = (req,res,next) => {    
    let productId = req.body.productId;
    User.deleteFromCart(req.user,productId).then(cart => {
        res.redirect("/cart");
    }).catch(err => {
        console.log(err);
    });
}
