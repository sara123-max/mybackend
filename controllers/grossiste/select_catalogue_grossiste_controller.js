const { getGrossisteCatalogues } = require("../../modules/grossiste/select_catalogue_grossiste");

const CatalogueGrossisteController = {
    getGrossisteCatalogues: (req, res) => {
        const grossisteUserId = req.user.userId; // From JWT token
        
        getGrossisteCatalogues(grossisteUserId, (err, catalogues) => {
            if (err) {
                console.error("Error fetching grossiste catalogues:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }
            
            res.status(200).json({
                success: true,
                message: "Grossiste catalogues retrieved successfully",
                catalogues: catalogues
            });
        });
    }
};

module.exports = CatalogueGrossisteController;