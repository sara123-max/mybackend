const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryDeleteController');

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;