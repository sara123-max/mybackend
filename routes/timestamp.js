const express = require('express');
const router = express.Router();
const timeCatalogueController = require('../controllers/timeCatalogueController');

// Get timestamps for a catalogue
router.get('/:catalogueId', timeCatalogueController.getTimestamps);

// Update timestamp (optional)
//router.put('/:catalogueId', timeCatalogueController.updateTimestamp);

module.exports = router;