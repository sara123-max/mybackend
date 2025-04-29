const express = require('express');
const router = express.Router();
const SubcategoryController = require('../controllers/subcategoryCreateController');

router.post('/create', SubcategoryController.createSubcategory);

module.exports = router;