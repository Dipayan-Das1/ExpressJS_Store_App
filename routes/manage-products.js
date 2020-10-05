const path = require('path');

const express = require('express');

const productController = require('../controllers/productcontroller');

//create a mini express application
const router = express.Router();



/*
//Use controller 
//route get requests
router.get('/add-product',(req,res,next) => {
    //send response ... by default response type is text/html
    //res.send('<h1>Add product Page</h1><form action="/manage/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    
    //use path library , __dirname in global variable containing path to project
    //res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    //not invoking next so request willnot be propagated to other handlers
    //using templating instead
    res.render("add-product",{pageTitle:'Add Product',path:'/add-product'})
});
*/

router.get('/add-product',productController.getAddProduct);
router.get('/edit-product/:productId',productController.getEditProduct);
router.get('/products',productController.getProducts);



//route post requests only
/*   ----use controller logic
router.post('/add-product',(req,res,next) => {
    //body-parser parses the request and converts it to json format access body by req.body
    console.log(req.body);
    products.push({title:req.body.title});
    res.redirect('/');
});
*/



router.post('/add-product',productController.addProduct);
router.post('/edit-product',productController.editProduct);
router.post('/delete-product',productController.deleteProduct);

module.exports.router = router;

//moved to controller
//module.exports.products = products;