const DeletePointVenteModel = require('../../modules/grossiste/salepointDelete');

exports.deletePointVente = (req, res) => {
  const pointVenteId = req.params.id;

  DeletePointVenteModel.deletePointVente(pointVenteId, (error, result) => {
    if (error) {
      return res.status(404).json({
        status: 'fail',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      data: null,
      message: 'Point de vente deleted successfully'
    });
  });
};