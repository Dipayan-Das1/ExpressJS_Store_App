const Cart = require('../models/cartmodel');
const Product = require('../models/productmodel');
module.exports.getCartDetails = (req,res,next) => {
    req.user.getCart({ include: Product }).then(cart => {
        
        if(cart)
        {
           return cart.getProducts();
        }
        else
        {
            return []
        }
        
        }).then(products => {
            let cartDtls = {products : products,price : 0};
            res.render("customer/cart",{pageTitle:'Customer Cart',path:'/cart',cart:cartDtls});    
        });   
}

module.exports.processOrder = (req,res,next) => {
    let fetchedCart;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    }).then(products => {
        return req.user.createOrder({total:0}).then(order => {
           return  order.addProducts(products.map(prod => {
                prod.orderItem = {quantity: prod.cartItem.quantity, price: prod.price };
                return prod;
            }));
        })
    }).then(order => {
        fetchedCart.setProducts(null);
        return fetchedCart
    }).then(cart => {
        res.redirect("/orders");
    });
}

module.exports.orders = (req,res,next) => {
    req.user.getOrders({include: Product}).then(orders => {
        res.render("customer/orders",{pageTitle:'Customer Orders',path:'/orders',orders:orders});    
    });
}



module.exports.addToCart = (req,res,next) => {    
    let productId = req.body.productId;

    req.user.getCart().then(cart => {
        if(!cart)
        {
            cart = req.user.createCart();
        }
        return cart;
    }).then(cart => {
        const products = cart.getProducts({where: {id: productId}});
        let newQuantity = 1 ;
        products.then(products => {
            
            let product;
            if(products && products.length > 0)
            {
                product = products[0];
            }

            if(product)
            {
                let oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
            }
            else
            {
                product = Product.findByPk(productId);
            }
            return product;
        }).then(prod => {
            console.log("quantity "+newQuantity);
            cart.addProduct(prod,{through : {quantity: newQuantity}});
            return cart;
        }).then(cart => {
            res.redirect("/cart"); 
        });


    });

}


module.exports.deleteFromCart = (req,res,next) => {    
    let productId = req.body.productId;
    req.user.getCart().then(cart => {
        return cart.getProducts({where: {id: productId}})
    }).then(prods => {
        return prods[0];
    }).then(prod => {
        prod.cartItem.destroy();
        res.redirect("/cart");
    });
}
