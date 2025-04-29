const express = require('express');
const router = express.Router();
const productController = require('../controllers/productDeleteController');

router.delete('/:id', productController.deleteProduct);

module.exports = router;