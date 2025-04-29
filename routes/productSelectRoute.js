const express = require('express');
const router = express.Router();
const ProductSelectController = require('../controllers/productSelectController');
const ProductSingleController = require('../controllers/productSingleController');
// GET all products
router.get('/', ProductSelectController.getAllProducts);

// Add the new route for getting a single product
router.get('/:id', ProductSingleController.getProductById);

module.exports = router;