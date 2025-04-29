const DeleteProduct = require('../modules/deleteProduct');

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  DeleteProduct.deleteProduct(productId, (error, deletedProduct) => {
    if (error) {
      return res.status(404).json({
        status: 'fail',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      data: null,
      message: 'Product deleted sucacessfully'
    });
  });
};