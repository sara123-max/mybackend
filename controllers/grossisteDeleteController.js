const DeleteModel = require('../modules/deleteGrossiste');

exports.deleteGrossiste = (req, res) => {
  const grossisteId = req.params.id;

  DeleteModel.deleteGrossiste(grossisteId, (error, deletedGrossiste) => {
    if (error) {
      return res.status(404).json({
        status: 'fail',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      data: null,
      message: 'Grossiste deleted successfully'
    });
  });
};
