const path = require('path');
const express = require('express');
const productsAdmin = require('./manage-products')

router = express.Router();


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

module.exports=router;