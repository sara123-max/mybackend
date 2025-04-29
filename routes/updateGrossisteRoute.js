// routes/grossisteRoutes.js
const express = require('express');
const router = express.Router();
const grossisteControllerUpdate = require('../controllers/grossisteUpdateController');

// Other routes would be here...

// Route to update a grossiste
router.put('/grossistes/:id', grossisteControllerUpdate.updateGrossiste);

module.exports = router;