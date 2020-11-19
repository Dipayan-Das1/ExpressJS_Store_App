const path = require('path');

const express = require('express');

const productController = require('../controllers/admincontroller');

const auth = require('../util/authchecker')
//create a mini express application
const router = express.Router();

router.get('/products',auth,productController.getProducts);
router.get('/add-product',auth,productController.getAddProduct);
router.get('/edit-product/:productId',auth,productController.getEditProduct);



router.post('/add-product',auth,productController.addProduct);

router.post('/edit-product',auth,productController.editProduct);
router.post('/delete-product',auth,productController.deleteProduct);

module.exports.router = router;

