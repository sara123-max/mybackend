const express = require('express');
const router = express.Router();
const CatalogueSelectController = require('../controllers/catalogueSelectController');

// Get all catalogues with their products
router.get('/', CatalogueSelectController.getAllCataloguesWithProducts);

module.exports = router;