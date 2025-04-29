const express = require('express');
const router = express.Router();
const { deleteProductsFromCatalogue } = require('../controllers/catalogueDeleteProductsController');

// DELETE /api/catalogues/:catalogueId/products
router.delete('/:catalogueId/products', deleteProductsFromCatalogue);

module.exports = router;