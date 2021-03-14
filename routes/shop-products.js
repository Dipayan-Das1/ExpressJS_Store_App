
const path = require('path');
const express = require('express');
const productController = require('../controllers/productcontroller');
const cartController = require('../controllers/cartcontroller')
const auth = require('../util/authchecker')
router = express.Router();

/* Use controller instead
router.get('/',(req,res,next) => {
    //send response ... by default response type is text/html
    //res.send('<h1>Hello from Express js</h1><a href="/manage/add-product">Add product</a>');
    //res.sendFile(path.join(__dirname,'../','views','product.html'));
    //use templating instead
    console.log("Inside get /")
    const products = productsAdmin.products;
    console.log(products);
    //res.render('Product',{prods:products,pageTitle:'Products Page',path:'/'})
    res.render("shop",{pageTitle:'Add Product',path:'/',products:products})
});
*/
 router.get('/',productController.getShopDetails);
router.get('/products',productController.getAllProducts);
router.get('/product/detail/:productId',auth,productController.getProductDetail);

router.post('/place-order',auth,cartController.processOrder);
router.get('/orders',auth,cartController.orders);

router.post('/cart/delete',auth,cartController.deleteFromCart);
router.post('/cart',auth,cartController.addToCart);
router.get('/cart',auth,cartController.getCartDetails);
 
module.exports=router;