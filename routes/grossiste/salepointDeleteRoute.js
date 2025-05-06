const express = require('express');
const router = express.Router();
const pointVenteDeleteController = require('../../controllers/grossiste/salepointDeleteContoller');

router.delete('/:id', pointVenteDeleteController.deletePointVente);

module.exports = router;