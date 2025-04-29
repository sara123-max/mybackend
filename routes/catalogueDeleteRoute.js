const express = require('express');
const router = express.Router();
const { deleteCatalogue } = require('../controllers/catalogueDeleteController');

// DELETE /api/catalogues/:catalogueId
router.delete('/:catalogueId', deleteCatalogue);

module.exports = router;