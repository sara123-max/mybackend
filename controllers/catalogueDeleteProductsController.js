const CatalogueDeleteProducts = require('../modules/deleteProductFromCatalogue');

const deleteProductsFromCatalogue = async (req, res) => {
  try {
    const { catalogueId } = req.params;
    const { productIds } = req.body;

    if (!catalogueId || !productIds) {
      return res.status(400).json({
        success: false,
        message: 'Catalogue ID and product IDs are required'
      });
    }

    const result = await CatalogueDeleteProducts.deleteProducts(catalogueId, productIds);
    
    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} products from catalogue`,
      data: result
    });

  } catch (error) {
    console.error('Error deleting products from catalogue:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete products from catalogue'
    });
  }
};

module.exports = {
  deleteProductsFromCatalogue
};