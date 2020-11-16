const ProductModel = require('../models/productmodel');

//move to a model class
//const products = []





///-----------------------------------------------------------------

module.exports.getAllProducts = (req,res,next) => {
    console.log("Inside get getAllProducts");

    ProductModel.findAll().then(rows => {
        res.render("customer/product-list",{pageTitle:'Product List',path:'/products',products:rows});
    }).catch(err => {
        console.log(err);
    });            
}

module.exports.getShopDetails = (req,res,next) => {
    console.log("Inside get getShopDetails");
    ProductModel.findAll().then(rows => {
        res.render("customer/index",{pageTitle:'Shop Details Page',path:'/',products:rows});
    }).catch(err => {
        console.log(err);
    });
}

module.exports.getProductDetail = (req,res,next) => {
    console.log("Inside get product detail "+req.params.productId);
    const product = ProductModel.getById(req.params.productId);
    product.then((prod) => {
        res.render("customer/product-detail",{pageTitle:'Product Detail',path:'/products',product:prod}); 
    }).catch(err => {
        console.log(err);
    });
}