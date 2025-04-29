const TimeCatalogue = require('../modules/timeCatalogue');

const TimeCatalogueController = {
    getTimestamps: (req, res) => {
        const { catalogueId } = req.params;
        
        TimeCatalogue.getTimestamps(catalogueId, (err, timestamps) => {
            if (err) {
                console.error('Error fetching timestamps:', err);
                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                });
            }
            
            res.status(200).json({
                message: 'Timestamps retrieved successfully',
                timestamps: timestamps
            });
        });
    },

    // Optional: Endpoint to update timestamp (though MySQL handles this automatically)
    /*updateTimestamp: (req, res) => {
        const { catalogueId } = req.params;
        
        TimeCatalogue.touchCatalogue(catalogueId, (err) => {
            if (err) {
                console.error('Error updating timestamp:', err);
                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                });
            }
            
            res.status(200).json({
                message: 'Timestamp updated successfully'
            });
        });
    }*/
};

module.exports = TimeCatalogueController;