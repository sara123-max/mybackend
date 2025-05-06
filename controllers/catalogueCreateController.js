// controllers/catalogueCreateController.js
const db = require('../db');
const CreateCatalogue = require('../modules/createCatalogue');
const SingleCatalogue = require('../modules/selectSingleCatalogue');

const CatalogueCreateController = {
  createCatalogue: (req, res) => {
    const { name, productIds, grossisteIds } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Catalogue name is required' });
    }

    // (Optional) Validate grossisteIds (must be an array if provided)
    if (grossisteIds && !Array.isArray(grossisteIds)) {
      return res.status(400).json({ message: 'grossisteIds must be an array' });
    }

    // (Optional) Validate productIds (must be an array if provided)
    if (productIds && !Array.isArray(productIds)) {
      return res.status(400).json({ message: 'productIds must be an array' });
    }
        // First validate grossistes exist
        validateGrossistes(grossisteIds || [], (err) => {
          if (err) return res.status(400).json({ message: err.message });
    // Create the catalogue (grossisteIds can be empty)
    CreateCatalogue.createCatalogueWithProducts(
      name,
      productIds || [], // Default to empty array
      grossisteIds || [], // Default to empty array
      (err, catalogueId) => {
        if (err) {
          console.error('Error creating catalogue:', err);
          return res.status(500).json({
            message: 'Error creating catalogue',
            error: err.message
          });
        }

        // Fetch the complete catalogue with products
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
            catalogue: completeCatalogue //just add this if uwant the full catalogue tobe returned
          });
        });
      }
      
    );
  });
  }






  
};
// Add this validation in your controller
const validateGrossistes = (grossisteIds, callback) => {
  if (!grossisteIds || grossisteIds.length === 0) return callback(null);
  
  const placeholders = grossisteIds.map(() => '?').join(',');
  db.query(
    `SELECT user_id FROM grossiste WHERE user_id IN (${placeholders})`,
    grossisteIds,
    (err, results) => {
      if (err) return callback(err);
      
      const existingIds = results.map(row => row.user_id);
      const missingIds = grossisteIds.filter(id => !existingIds.includes(id));
      
      if (missingIds.length > 0) {
        return callback(new Error(`The following users are not registered as grossistes: ${missingIds.join(', ')}`));
      }
      callback(null);
    }
  );
};

module.exports = CatalogueCreateController;