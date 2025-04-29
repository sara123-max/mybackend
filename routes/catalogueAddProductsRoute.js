const express = require('express');
const router = express.Router();
const CatalogueAddProductsController = require('../controllers/catalogueAddProductsController');

// Changed to PUT /:catalogueId to handle both operations
router.put('/:catalogueId', CatalogueAddProductsController.updateCatalogueAndProducts);

module.exports = router;