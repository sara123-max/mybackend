const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const catalogueForSalepointsController = require('../../controllers/grossiste/catalogueForSalepointsController');

router.post(
  '/catalogues/salepoints',
  authMiddleware.authenticate,
  authMiddleware.isGrossiste,
  catalogueForSalepointsController.createCatalogue
);

module.exports = router;