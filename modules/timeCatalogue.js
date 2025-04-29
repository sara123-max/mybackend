const db = require('../db');

const TimeCatalogue = {
    // Get timestamps for a catalogue
    getTimestamps: (catalogueId, callback) => {
        const query = 'SELECT created_at, updated_at FROM catalogue WHERE id = ?';
        db.query(query, [catalogueId], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) {
                // If no record exists, create one with current timestamps
                const insertQuery = 'INSERT INTO catalogue_timestamps (id) VALUES (?)';
                db.query(insertQuery, [catalogueId], (err) => {
                    if (err) return callback(err);
                    // Return the newly created timestamps
                    callback(null, {
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                });
            } else {
                callback(null, {
                    createdAt: results[0].created_at,
                    updatedAt: results[0].updated_at
                });
            }
        });
    },

    // Update the timestamp (automatically handled by MySQL)
    touchCatalogue: (catalogueId, callback) => {
        const query = 'INSERT INTO catalogue (catalogue_id) VALUES (?) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP';
        db.query(query, [catalogueId], (err) => {
            callback(err);
        });
    }
};

module.exports = TimeCatalogue;