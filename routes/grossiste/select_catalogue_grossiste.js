const express = require('express');
const router = express.Router();
const catalogueGrossisteController = require('../../controllers/grossiste/select_catalogue_grossiste_controller');
const authMiddleware = require('../../middlewares/authMiddleware');

// Debug: Check if controller is properly imported
console.log('catalogueGrossisteController:', catalogueGrossisteController);

// Protected route - only accessible by authenticated grossistes
router.get(
    '/catalogues',
    authMiddleware.authenticate,
    authMiddleware.isGrossiste,
    catalogueGrossisteController.getGrossisteCatalogues
);

module.exports = router;