const express = require('express');
const router = express.Router();
const pointVenteUpdateController = require('../../controllers/grossiste/salepointUpdateController');

router.put('/:id', pointVenteUpdateController.updatePointVente);

module.exports = router;