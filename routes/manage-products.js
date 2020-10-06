const path = require('path');

const express = require('express');

const productController = require('../controllers/admincontroller');

//create a mini express application
const router = express.Router();

router.get('/add-product',productController.getAddProduct);
router.get('/edit-product/:productId',productController.getEditProduct);
router.get('/products',productController.getProducts);

router.post('/add-product',productController.addProduct);
router.post('/edit-product',productController.editProduct);
router.post('/delete-product',productController.deleteProduct);

module.exports.router = router;

