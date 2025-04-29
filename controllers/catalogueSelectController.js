const { getCataloguesWithProducts } = require("../modules/selectCatalogue");

const CatalogueSelectController = {
    getAllCataloguesWithProducts: (req, res) => {
        getCataloguesWithProducts((err, catalogues) => {
            if (err) {
                console.error("Error fetching catalogues with products:", err);
                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }
            
            res.status(200).json({
                message: "Catalogues with products retrieved successfully",
                catalogues: catalogues
            });
        });
    }
};

module.exports = CatalogueSelectController;