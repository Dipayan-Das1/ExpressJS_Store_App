const Cart = require('../models/cartmodel');
const Product = require('../models/productmodel');
module.exports.getCartDetails = (req,res,next) => {
    Cart.readCart(cart => {
        if(cart.products.length > 0)
        {
            Product.fetchAll((products) => {
                let cartProducts = [];
                for(product of products)
                {
                    let cartProduct = cart.products.find(prod => parseInt(prod.id) === product.id);
                    console.log(cartProduct);
                    if(cartProduct)
                    {
                        cartProducts.push({product:product,quantity:cartProduct.qty});
                    }
                }
                let cartDtls = {products : cartProducts,price : cart.price};
                console.log(cartDtls);
                res.render("customer/cart",{pageTitle:'Customer Cart',path:'/cart',cart:cartDtls});
            });
        }
        else{
            res.render("customer/cart",{pageTitle:'Customer Cart',path:'/cart',cart:null});
        }
        
    });
    
    
    
    
}

module.exports.checkout = (req,res,next) => {
    res.render("customer/checkout",{pageTitle:'Checkout Paage',path:'/checkout'});
}



module.exports.addToCart = (req,res,next) => {    
    let productId = req.body.productId;
    Product.getById(productId,(prod) => {

        console.log("Add to cart")
        console.log(prod)

        Cart.addToCart(productId,prod.price,
            (cart) => 
            {
                res.redirect("/cart");
                //res.render("customer/cart",{pageTitle:'Customer Cart',path:'/cart',cart:cart});
            }
        );
        
    
    });
}


module.exports.deleteFromCart = (req,res,next) => {    
    let productId = req.body.productId;
    Product.getById(productId,(prod) => {
        Cart.deleteFromCart(productId,prod.price,(cart) => {
            res.redirect("/cart");
        });
    });
}