const ProductModel = require('../models/productmodel');

module.exports.getAddProduct = (req,res,next) => {
    res.render("admin/edit-product",{pageTitle:'Add Product',path:'/add-product',editing:false});
}

module.exports.addProduct = (req,res,next) => {
    console.log("Add product ");
    req.user.createProduct({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageUrl: 'image'
    }).then(res => {
        console.log(res);
        res.redirect('/manage/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
    });
      
    
}

module.exports.editProduct = (req,res,next) => {
    //body-parser parses the request and converts it to json format access body by req.body
    console.log("Edit product");
    ProductModel.update({ title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }, {
        where: {
          id: req.body.id
        }
      }).then(res => {
        res.redirect('/manage/products');
      }).catch(err => {
        console.log(err);
        res.redirect('/manage/products');
      });
   
}

module.exports.getEditProduct = (req,res,next) => {
    console.log("Inside edit product "+req.params.productId);
    const product = req.user.getProducts({where: {id: req.params.productId}});    
    product.then((prod) => {
        if(prod.length > 0)
        {
            res.render("admin/edit-product",{pageTitle:'Edit Product',path:'/edit-product',product:prod[0],editing:true}); 
        }
        else{
            res.redirect('/manage/products');
        }
    });
}

module.exports.deleteProduct = (req,res,next) => {
    console.log("Inside delete product "+req.body.productId);
    ProductModel.destroy({
        where: {
          id: req.body.productId
        }
      }).then(resp => {
        res.redirect('/manage/products');
      });
}

module.exports.getProducts = (req,res,next) => {
    req.user.getProducts({}).then(rows => {
        res.render("admin/products",{pageTitle:'Admin Products page',path:'/admin-product',products:rows});
    }).catch(err => {
        console.log(err);
    });  
}