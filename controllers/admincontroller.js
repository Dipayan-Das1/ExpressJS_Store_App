const Product = require('../models/productmodel');

module.exports.getAddProduct = (req,res,next) => {
    res.render("admin/edit-product",{pageTitle:'Add Product',path:'/add-product',editing:false});
}

module.exports.addProduct = (req,res,next) => {
    console.log("Add product ");
    let product = new Product(req.body.title,req.body.price,req.body.description,req.user);
    product.save().then(prod => {
        console.log("Product save");
        res.redirect('/manage/products');
            
    }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
    });    
}

module.exports.editProduct = (req,res,next) => {
    //body-parser parses the request and converts it to json format access body by req.body
    console.log("Edit product");
    let product = new Product(req.body.title,req.body.price,req.body.description,req.user,req.body.id);
    product.update().then(prod => {
        res.redirect('/manage/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
      });
}

module.exports.getEditProduct = (req,res,next) => {
    console.log("Inside edit product "+req.params.productId);
    const product = Product.getById(req.params.productId).then((prod) => {
        if(prod)
        {
            res.render("admin/edit-product",{pageTitle:'Edit Product',path:'/edit-product',product:prod,editing:true}); 
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
    
    console.log("Inside delete product "+req.body.productId);
    Product.delete(req.body.productId).then(resp => {
        res.redirect('/manage/products');
      }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
      });
}

module.exports.getProducts = (req,res,next) => {
    Product.findAllByUser(req.user).then(rows => {
        res.render("admin/products",{pageTitle:'Admin Products page',path:'/admin-product',products:rows});
    }).catch(err => {
        console.log(err);
    });  
}