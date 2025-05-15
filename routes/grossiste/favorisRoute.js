const express = require('express');
const router = express.Router();
const favorisController = require('../../controllers/grossiste/favoris_controller');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get(
    '/favoris',
    authMiddleware.authenticate,
    authMiddleware.isGrossiste,
    favorisController.getFavoris
);

module.exports = router;