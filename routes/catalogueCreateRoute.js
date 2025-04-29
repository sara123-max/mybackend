// routes/catalogueCreateRoute.js
const express = require('express');
const router = express.Router();
const catalogueCreateController = require('../controllers/catalogueCreateController');

router.post('/catalogues', catalogueCreateController.createCatalogue);

module.exports = router;