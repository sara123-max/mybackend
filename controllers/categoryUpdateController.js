const UpdateCategory = require('../modules/updateCategory');

class CategoryUpdateController {
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      let categoryData = req.body;
      
      // Parse subcategories if provided
      if (categoryData.subcategories) {
        try {
          categoryData.subcategories = JSON.parse(categoryData.subcategories);
        } catch (e) {
          return res.status(400).json({
            success: false,
            message: 'Invalid subcategories format. Should be a JSON string.'
          });
        }
      }

      // Handle file upload if present
      if (req.file) {
        categoryData.image = req.file.buffer;
      } else if (!categoryData.image) {
        // If no new image and no image in body, keep existing image
        const existingCategory = await UpdateCategory.findById(id, true);
        categoryData.image = existingCategory.image;
      }

      const updatedCategory = await UpdateCategory.update(id, categoryData);
      
      res.status(200).json({
        success: true,
        category: updatedCategory
      });
    } catch (error) {
      console.error('Error updating category:', error);
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new CategoryUpdateController();