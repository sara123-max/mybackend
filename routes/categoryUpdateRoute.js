const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryUpdateController');
const multer = require('multer');

// Configure multer to use memory storage (for buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit to 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.put('/:id', 
  upload.single('image'),
  categoryController.updateCategory
);

module.exports = router;