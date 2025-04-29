const Category = require('../modules/selectCategory');

const CategorySelectController = {
  getAllCategories: (req, res) => {
    Category.findAll((err, categories) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch categories',
          error: err.message
        });
      }
      
      res.json({
        success: true,
        data: categories
      });
    });
  },

  getCategoryById: (req, res) => {
    const categoryId = req.params.id;
    
    Category.findById(categoryId, (err, category) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch category',
          error: err.message
        });
      }
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      res.json({
        success: true,
        data: category
      });
    });
  }
};

module.exports = CategorySelectController;