const Product = require('../models/productmodel');
const User = require('../models/usermodel');
const Order = require('../models/ordermodel');

const ObjectId = require('mongodb').ObjectID;


 module.exports.getCartDetails = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
     console.log("Get cart details");
    req.user.populate('cart.products.productId')
        .execPopulate()
        .then(usr => {
        console.log(usr.cart.products);
        
        let price = 0;
        
        usr.cart.products.forEach(prd => {
            price = price + prd.quantity * prd.productId.price;
        });
        cart = {products : usr.cart.products,price : price}
        res.render("customer/cart",{pageTitle:'Customer Cart',path:'/cart',cart:cart,isAuthenticated:authenticated});
    })        
}




module.exports.processOrder = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    console.log("price is "+req.body.price);
    const order = new Order();
    order.price = req.body.price;
    order.user = req.user;
    req.user.populate('cart.products.productId')
        .execPopulate()
        .then(usr => {
            order.products = usr.cart.products.map(prodItem => {
                console.log("Inside process order");
                console.log(prodItem);
                let productData = { ...prodItem.productId._doc };   ///this is needed to get the product data and copy to order product data
                let quantity = prodItem.quantity;
                return {productData:productData,quantity:quantity};

            });
            console.log(order);
            return order;
        })
        .then(ordr => {
            return order.save();
        }).then(res => {
            req.user.cart.products = [];
            return req.user.save(); 
        }).then(resp => {
            res.redirect("/orders");
        });
       

       
}


module.exports.orders = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    Order.find({user: req.user}).then(orders => {
        console.log(orders);
        res.render("customer/orders",{pageTitle:'Customer Orders',path:'/orders',orders:orders,isAuthenticated:authenticated});       
    }).catch(err => {
        console.log(err);
        res.redirect("/");
    });
    
    
    
}
 


module.exports.addToCart = (req,res,next) => {   
    let authenticated = req.session.isLoggedin ? true : false;
    console.log("Inside add to cart") 
    let productId = req.body.productId;

    req.user.addToCart(productId).then(cart => {
            console.log(cart);
            res.redirect("/cart"); 
        });
}


module.exports.deleteFromCart = (req,res,next) => {  
    let authenticated = req.session.isLoggedin ? true : false;  
    let productId = req.body.productId;
    req.user.deleteFromCart(productId).then(cart => {
        res.redirect("/cart");
    }).catch(err => {
        console.log(err);
    });
}
