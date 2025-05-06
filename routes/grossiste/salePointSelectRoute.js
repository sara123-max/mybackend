const express = require("express");
const router = express.Router();
// To this (if grossiste is the correct folder name):
const salePointSelectController = require('../../controllers/grossiste/salePointSelectController');

console.log('SalePoint select Controller:', salePointSelectController);

router.get("/salepoints", salePointSelectController.getAllSalePoints);

module.exports = router;