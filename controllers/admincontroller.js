const Product = require('../models/productmodel');

module.exports.getAddProduct = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    res.render("admin/edit-product",{pageTitle:'Add Product',path:'/add-product',editing:false,isAuthenticated:authenticated});
}

module.exports.addProduct = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    console.log("Add product ");
    let product = new Product({title:req.body.title,price:req.body.price,description:req.body.description,createdBy:req.user});
    product.save().then(prod => {
        console.log("Product save");
        res.redirect('/manage/products');
            
    }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
    });    
}

module.exports.editProduct = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    //body-parser parses the request and converts it to json format access body by req.body
    console.log("Edit product");
    Product.findById(req.body.id).then((prod) => {
        prod.title = req.body.title;
        prod.description = req.body.description;
        prod.price = req.body.price;
        return prod.save();
    }).then(prod => {
        res.redirect('/manage/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
      });
}

module.exports.getEditProduct = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    console.log("Inside edit product "+req.params.productId);
    const product = Product.findById(req.params.productId).then((prod) => {
        if(prod)
        {
            res.render("admin/edit-product",{pageTitle:'Edit Product',path:'/edit-product',product:prod,editing:true,isAuthenticated:authenticated}); 
        }
        else{
            res.redirect('/manage/products');
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
      });
}


module.exports.deleteProduct = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    console.log("Inside delete product "+req.body.productId);
    Product.findByIdAndDelete(req.body.productId).then(resp => {
        res.redirect('/manage/products');
      }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
      });
}

module.exports.getProducts = (req,res,next) => {
    let authenticated = req.session.isLoggedin ? true : false;
    console.log("Inside get products")
    Product.find({createdBy: req.user}).then(rows => {
        console.log(rows);
        res.render("admin/products",{pageTitle:'Admin Products page',path:'/admin-product',products:rows,isAuthenticated:authenticated});
    }).catch(err => {
        console.log(err);
    });  
}