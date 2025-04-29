
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productCreateController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', 
  upload.single('image'), // ← Multer middleware here
  ProductController.createProduct 
);

module.exports = router;