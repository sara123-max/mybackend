const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorySelectController');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get single category by ID
router.get('/:id', categoryController.getCategoryById);

module.exports = router;