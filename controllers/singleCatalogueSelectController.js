const { findByIdWithProducts } = require("../modules/selectSingleCatalogue");

const SingleCatalogueSelectController = {
  getCatalogueWithProducts: (req, res) => {
    const catalogueId = req.params.id;

    findByIdWithProducts(catalogueId, (err, catalogue) => {
      if (err) {
        console.error("Error fetching catalogue with products:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.message
        });
      }

      if (!catalogue) {
        return res.status(404).json({
          message: "Catalogue not found"
        });
      }

      res.status(200).json({
        message: "Catalogue with products retrieved successfully",
        catalogue: catalogue
      });
    });
  }
};

module.exports = SingleCatalogueSelectController;