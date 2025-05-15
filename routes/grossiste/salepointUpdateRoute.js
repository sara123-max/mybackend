/*const express = require('express');
const router = express.Router();
const pointVenteUpdateController = require('../../controllers/grossiste/salepointUpdateController');

router.put('/:id', pointVenteUpdateController.updatePointVente);

module.exports = router;*/


const express = require('express');
const router = express.Router();
const multer = require('multer');
const pointVenteUpdateController = require('../../controllers/grossiste/salepointUpdateController');

// Configure multer for memory storage (for database storage as BLOB)
const storage = multer.memoryStorage();

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false);
  }
};

// Initialize multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Update endpoint with image upload support
router.put('/:id', upload.single('image'), pointVenteUpdateController.updatePointVente);

module.exports = router;