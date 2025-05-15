const { getSalepointCatalogues } = require("../../modules/grossiste/select_catalogue_salepoint");

const CatalogueSalepointController = {
    getSalepointCatalogues: (req, res) => {
        const grossisteId = req.user.userId; // Get from JWT
        
        getSalepointCatalogues(grossisteId, (err, catalogues) => {
            if (err) {
                console.error("Error fetching salepoint catalogues:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }
            
            res.status(200).json({
                success: true,
                message: "Salepoint catalogues retrieved successfully",
                catalogues: catalogues
            });
        });
    }
};

module.exports = CatalogueSalepointController;