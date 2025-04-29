const express = require('express');
const router = express.Router();
const grossisteDeleteController = require('../controllers/grossisteDeleteController');

router.delete('/:id', grossisteDeleteController.deleteGrossiste);

module.exports = router;