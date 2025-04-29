// routes.js
const express = require("express");
const router = express.Router();
const SelectGrossisteController = require("../controllers/selectGrossisteController");

console.log('Grossiste select Controller:', SelectGrossisteController);

// Route to get all grossistes
router.get("/grossistes", SelectGrossisteController.getAllGrossistes);

module.exports = router;