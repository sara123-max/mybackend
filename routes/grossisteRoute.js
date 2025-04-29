const express = require('express');
const router = express.Router();
const grossisteController = require('../controllers/grossisteController'); // Import the controller
const { checkUsernameEmailExists }= require('../controllers/grossisteCheckEmailUsernameController');
const multer = require('multer');

// Log to verify the controller is imported
console.log('Grossiste Controller:', grossisteController);


// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for creating a grossiste (with image upload)
router.post("/create", upload.single("image"), grossisteController.createGrossiste);


// Route to check if username or email exists
router.post('/check-exists', checkUsernameEmailExists);


module.exports = router;
