const CreateCatalogueForSalepoints = require('../../modules/grossiste/createCatalogueForSalepoints');

const CatalogueForSalepointsController = {
  createCatalogue: (req, res) => {
    const { name, productIds = [], salepointIds = [] } = req.body;
    const grossisteId = req.user.userId; // From JWT token

    if (!name) {
      return res.status(400).json({ success: false, message: 'Catalogue name is required' });
    }

    if (!Array.isArray(salepointIds) ){
      return res.status(400).json({ success: false, message: 'salepointIds must be an array' });
    }

    if (salepointIds.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one salepoint must be selected' });
    }

    if (!Array.isArray(productIds)) {
      return res.status(400).json({ success: false, message: 'productIds must be an array' });
    }

    CreateCatalogueForSalepoints.createCatalogue(
      name,
      productIds,
      salepointIds,
      grossisteId,
      (err, catalogueId) => {
        if (err) {
          console.error('Error creating catalogue:', err);
          return res.status(500).json({ 
            success: false,
            message: 'Failed to create catalogue',
            error: err.message
          });
        }

        res.status(201).json({ 
          success: true,
          message: 'Catalogue created successfully'
        });
      }
    );
  }
};

module.exports = CatalogueForSalepointsController;