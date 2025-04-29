const { createSubcategory } = require('../modules/createSubcategory');

const SubcategoryController = {
  createSubcategory: (req, res) => {
    const { name, category_id, status } = req.body;

    // Validation
    if (!name || !category_id) {
      return res.status(400).json({
        error: 'Name and category ID are required'
      });
    }

    createSubcategory(name, category_id, status, (err, result) => {
      if (err) {
        console.error('Subcategory creation error:', err);
        return res.status(500).json({
          error: 'Database operation failed',
          details: err.message
        });
      }
      
      res.status(201).json({
        message: 'Subcategory created successfully',
        subcategory: result
      });
    });
  }
};

module.exports = SubcategoryController;