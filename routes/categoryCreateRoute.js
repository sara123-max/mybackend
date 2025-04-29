// categoryCreateRoute.js
const express = require("express");
const router = express.Router();
const categoryCreateController = require("../controllers/categoryCreateController"); 
const multer = require("multer");

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for creating a category (with image upload)
router.post("/create", upload.single("image"), categoryCreateController.addCategory); 

module.exports = router;