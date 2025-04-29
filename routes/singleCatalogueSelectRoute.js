const express = require('express');
const router = express.Router();
const SingleCatalogueSelectController = require('../controllers/singleCatalogueSelectController');

router.get('/:id', SingleCatalogueSelectController.getCatalogueWithProducts);

module.exports = router;