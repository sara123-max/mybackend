const DeleteCategory = require('../modules/deleteCategory');
exports.deleteCategory = (req, res) => {
    const categoryId = req.params.id;
  
    DeleteCategory.deleteCategory(categoryId, (error, result) => {
      if (error) {
        return res.status(error.message.includes('not found') ? 404 : 400).json({
          status: 'fail',
          message: error.message
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: null,
        message: `Category and ${result.subcategoriesDeleted} subcategories deleted successfully`
      });
    });
  };