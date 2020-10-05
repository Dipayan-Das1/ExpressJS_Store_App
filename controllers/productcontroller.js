const ProductModel = require('../models/productmodel');
//move to a model class
//const products = []



module.exports.getAddProduct = (req,res,next) => {
    res.render("admin/edit-product",{pageTitle:'Add Product',path:'/add-product',editing:false});
}

module.exports.addProduct = (req,res,next) => {
    //body-parser parses the request and converts it to json format access body by req.body
    console.log(req.body);
    //saving data propagated to model  class
    //products.push({title:req.body.title});

    //constructing product model class
    const prod = new ProductModel(null,req.body.title,req.body.price,req.body.description);
    prod.save();
    res.redirect('/manage/products');
}

module.exports.editProduct = (req,res,next) => {
    //body-parser parses the request and converts it to json format access body by req.body
    console.log("Request body");
    console.log(req.body);
    //saving data propagated to model  class
    //products.push({title:req.body.title});

    //constructing product model class
    const prod = new ProductModel(parseInt(req.body.id),req.body.title,req.body.price,req.body.description);
    prod.update();
    res.redirect('/');
}

module.exports.getEditProduct = (req,res,next) => {
    console.log("Inside edit product "+req.params.productId);
    ProductModel.getById(req.params.productId,prod => {
        console.log(prod);
        res.render("admin/edit-product",{pageTitle:'Edit Product',path:'/edit-product',product:prod,editing:true}); 
    });
   
}

module.exports.deleteProduct = (req,res,next) => {
    console.log("Inside delete product "+req.body.productId);
    ProductModel.delete(req.body.productId);
    res.redirect('/');
}

module.exports.getProducts = (req,res,next) => {

    ProductModel.fetchAll(prods => {
        //console.log(products);
        
        console.log(prods);
        res.render("admin/products",{pageTitle:'Admin Products page',path:'/admin-product',products:prods});
    
        });    
    
}

///-----------------------------------------------------------------

module.exports.getAllProducts = (req,res,next) => {
    console.log("Inside get getAllProducts")
    //passed as callback
    ProductModel.fetchAll(prods => {
    //console.log(products);
    
    console.log(prods);
    res.render("customer/product-list",{pageTitle:'Product List',path:'/products',products:prods});

    });    
}

module.exports.getShopDetails = (req,res,next) => {
    console.log("Inside get getShopDetails")
    //passed as callback
    ProductModel.fetchAll(prods => {
    //console.log(products);
    
    console.log(prods);
    res.render("customer/index",{pageTitle:'Shop Details Page',path:'/',products:prods});

    });    
}

module.exports.getProductDetail = (req,res,next) => {
    console.log("Inside get product detail "+req.params.productId);
    ProductModel.getById(req.params.productId,prod => {
        console.log(prod);
        res.render("customer/product-detail",{pageTitle:'Product Detail',path:'/products',product:prod}); 
    }); 
}