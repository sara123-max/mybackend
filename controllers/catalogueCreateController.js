// controllers/catalogueCreateController.js
/*const CreateCatalogue = require('../modules/createCatalogue');

const CatalogueCreateController = {
  createCatalogue: (req, res) => {
    const { name, productIds } = req.body;
    
    if (!name || !productIds || !Array.isArray(productIds)) {
      return res.status(400).json({
        message: 'Name and productIds array are required'
      });
    }
    
    CreateCatalogue.createCatalogueWithProducts(name, productIds, (error, result) => {
      if (error) {
        console.error('Error creating catalogue:', error);
        return res.status(500).json({
          message: 'Error creating catalogue',
          error: error.message
        });
      }
      
      res.status(201).json({
        message: 'Catalogue created successfully',
        catalogue: result
      });
    });
  }
};

module.exports = CatalogueCreateController;*/
// controllers/catalogueCreateController.js
const CreateCatalogue = require('../modules/createCatalogue');
const SingleCatalogue = require('../modules/selectSingleCatalogue');

const CatalogueCreateController = {
  createCatalogue: (req, res) => {
    const { name, productIds } = req.body;
    
    if (!name || !productIds || !Array.isArray(productIds)) {
      return res.status(400).json({
        message: 'Name and productIds array are required'
      });
    }
    
    // 1. First create the catalogue (returns just the ID)
    CreateCatalogue.createCatalogueWithProducts(name, productIds, (err, catalogueId) => {
      if (err) {
        console.error('Error creating catalogue:', err);
        return res.status(500).json({
          message: 'Error creating catalogue',
          error: err.message
        });
      }
      
      // 2. Then fetch the complete catalogue with products
      // this is using the model of selecting catalogue by id
      SingleCatalogue.findByIdWithProducts(catalogueId, (err, completeCatalogue) => {
        if (err) {
          console.error('Error fetching created catalogue:', err);
          return res.status(500).json({
            message: 'Catalogue created but failed to fetch details',
            error: err.message
          });
        }
        
        res.status(201).json({
          message: 'Catalogue created successfully',
          catalogue: completeCatalogue
        });
      });
    });
  }
};

module.exports = CatalogueCreateController;