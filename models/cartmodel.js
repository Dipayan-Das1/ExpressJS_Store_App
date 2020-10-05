
const fs = require('fs');
const path = require('path') 

const pth = path.join(path.dirname(require.main.filename),'data','cart.json');

module.exports = class Cart{

    static addToCart(productId,price,cb)
    {
        fs.readFile(pth,(err,content) => {
            let cart = {products : [], price : 0};
            if(!err)
            {
                cart = JSON.parse(content);    
            }
            const index = cart.products.findIndex(prdct => prdct.id.toString() === productId);
            let cartProduct;
            if(index >= 0)
            {
                //copying the product
                cartProduct = { ...cart.products[index] };
                cartProduct.qty = cartProduct.qty + 1;
                //copying the product list 
                cart.products = [...cart.products];
                cart.products[index] = cartProduct;
            }
            else
            {
                cartProduct = {id: productId,qty:1};
                cart.products = [...cart.products,cartProduct];
            }
            cart.price = cart.price + parseInt(price);
            fs.writeFile(pth,JSON.stringify(cart),(err) => {
                if(err)
                {
                    console.log(err);
                }
                cb(cart);
            });

        });
    }

    static readCart(cb)
    {
        let cart = {products : [], price : 0};
        fs.readFile(pth,(err,data) => {
            if(!err)
            {
                console.log(data);
                cart = JSON.parse(data);
                console.log(cart);
            }
            cb(cart);
        });
        
    }

    static deleteFromCart(productid,price,cb)
    {
        fs.readFile(pth,(err,data) => {
            if(!err)
            {
                let cartData = JSON.parse(data);
                let cartItem = cartData.products.find(prod => prod.id === productid);
                if(cartItem)
                {
                    const quantity = cartItem.qty;
                    const priceDeduct = quantity * price;
                    let cartProducts = cartData.products.filter(prod => prod.id != productid);
                    cartData = {products : cartProducts, price : cartData.price - priceDeduct};
                    fs.writeFile(pth, JSON.stringify(cartData),() => {
                        console.log(err);
                    });
                }
                cb(cartData);
            }
        });
    }

} 