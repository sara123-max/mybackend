const express = require('express');
const router = express.Router();
const catalogueSalepointController = require('../../controllers/grossiste/select_catalogue_salepoint_controller');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get(
    '/salepoint-catalogues',
    authMiddleware.authenticate,
    authMiddleware.isGrossiste,
    catalogueSalepointController.getSalepointCatalogues
);

module.exports = router;