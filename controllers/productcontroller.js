const ProductModel = require('../models/productmodel');


///-----------------------------------------------------------------

module.exports.getAllProducts = (req,res,next) => {
    console.log("Inside get getAllProducts");
    
    let authenticated = req.session.isLoggedin ? true : false;

    ProductModel.find().then(rows => {
        res.render("customer/product-list",{pageTitle:'Product List',path:'/products',products:rows,isAuthenticated:authenticated});
    }).catch(err => {
        console.log(err);
    });            
}

module.exports.getShopDetails = (req,res,next) => {
    console.log("Inside get getShopDetails");
    let authenticated = req.session.isLoggedin ? true : false;
    ProductModel.find().then(rows => {
        console.log(rows);
        res.render("customer/index",{pageTitle:'Shop Details Page',path:'/',products:rows,isAuthenticated:authenticated});
    }).catch(err => {
        console.log(err);
    });
}

module.exports.getProductDetail = (req,res,next) => {
    console.log("Inside get product detail "+req.params.productId);
    let authenticated = req.session.isLoggedin ? true : false;
    //can pass a string to findById
    const product = ProductModel.findById(req.params.productId);
    product.then((prod) => {
        res.render("customer/product-detail",{pageTitle:'Product Detail',path:'/products',product:prod,isAuthenticated:authenticated}); 
    }).catch(err => {
        console.log(err);
    });
}