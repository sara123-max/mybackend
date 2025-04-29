const CatalogueDelete = require('../modules/deleteCatalogue');

const deleteCatalogue = async (req, res) => {
  try {
    const { catalogueId } = req.params;

    if (!catalogueId) {
      return res.status(400).json({
        success: false,
        message: 'Catalogue ID is required'
      });
    }

    const result = await CatalogueDelete.deleteCatalogue(catalogueId);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Catalogue not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Catalogue deleted successfully',
      data: result
    });

  } catch (error) {
    console.error('Error deleting catalogue:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete catalogue'
    });
  }
};

module.exports = {
  deleteCatalogue
};