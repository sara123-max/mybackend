/*const CatalogueAddProducts = require('../modules/catalogueAddProducts');

const CatalogueAddProductsController = {
  updateCatalogueAndProducts: async (req, res) => {
    try {
      const { catalogueId } = req.params;
      const { name, productIds } = req.body;

      if (!catalogueId || (!name && !productIds)) {
        return res.status(400).json({
          message: 'Provide at least name or productIds to update'
        });
      }

      // Just wait for the operation to complete
      await CatalogueAddProducts.updateNameAndAddProducts(catalogueId, name, productIds);

      // Immediate success response
      res.status(200).json({ 
        success: true,
        message: 'Catalogue updated successfully' 
      });

    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({
        success: false,
        message: err.message || 'Failed to update catalogue'
      });
    }
  }
};

module.exports = CatalogueAddProductsController;*/
const CatalogueAddProducts = require('../modules/catalogueAddProducts');

const CatalogueAddProductsController = {
  updateCatalogueAndProducts: async (req, res) => {
    try {
      const { catalogueId } = req.params;
      const { name, productIds, grossites } = req.body;

      if (!catalogueId || (!name && !productIds && !grossites)) {
        return res.status(400).json({
          message: 'Provide at least name, productIds, or grossites to update'
        });
      }

      await CatalogueAddProducts.updateCatalogue(
        catalogueId, 
        name, 
        productIds,
        grossites?.add,
        grossites?.remove
      );

      res.status(200).json({ 
        success: true,
        message: 'Catalogue updated successfully' 
      });

    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({
        success: false,
        message: err.message || 'Failed to update catalogue'
      });
    }
  }
};

module.exports = CatalogueAddProductsController;