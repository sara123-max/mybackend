const DeletePointVenteModel = require('../../modules/grossiste/salepointDelete');

exports.deletePointVente = async (req, res) => {
  try {
    const pointVenteId = req.params.id;
    await DeletePointVenteModel.deletePointVente(pointVenteId);
    
    res.status(200).json({
      status: 'success',
      data: null,
      message: 'Point de vente deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};