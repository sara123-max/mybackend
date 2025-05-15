const { getGrossisteFavoris } = require("../../modules/grossiste/get_favoris");

const FavorisController = {
    getFavoris: (req, res) => {
        const grossisteId = req.user.userId; // From JWT
        
        getGrossisteFavoris(grossisteId, (err, favoris) => {
            if (err) {
                console.error("Error fetching favoris:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }
            
            res.status(200).json({
                success: true,
                message: "Favoris retrieved successfully",
                favoris: favoris
            });
        });
    }
};

module.exports = FavorisController;