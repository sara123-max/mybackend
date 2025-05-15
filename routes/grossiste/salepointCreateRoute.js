// routes/grossiste/salepointRoutes.js
const express = require('express');
const router = express.Router();
const salepointController = require('../../controllers/grossiste/salepointCreateController');
const { checkUsernameEmailExists } = require('../../controllers/grossisteCheckEmailUsernameController');
const multer = require('multer');

const authMiddleware = require('../../middlewares/authMiddleware');

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for creating a sale point (with image upload)
router.post(
  "/create", 
  authMiddleware.authenticate,
  authMiddleware.isGrossiste, // Ensure only grossiste can create sale points
  upload.single("image"), 
  salepointController.createSalePoint
);

// Route to check if username or email exists
router.post('/check-exists', checkUsernameEmailExists);

module.exports = router;