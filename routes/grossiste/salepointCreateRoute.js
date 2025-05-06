const express = require('express');
const router = express.Router();
const salepointController = require('../../controllers/grossiste/salepointCreateController');
const { checkUsernameEmailExists } = require('../../controllers/grossisteCheckEmailUsernameController');
const multer = require('multer');

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for creating a sale point (with image upload)
router.post("/create", upload.single("image"), salepointController.createSalePoint);

// Route to check if username or email exists (reusing the same check as grossiste)
router.post('/check-exists', checkUsernameEmailExists);

module.exports = router;