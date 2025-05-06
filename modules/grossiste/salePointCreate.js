const db = require("../../db"); // Import database connection
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

const SalePoint = {
    // Create a new sale point (user + sale_point entry)
    createSalePoint: (userData, image, callback) => {
        // Check if username or email already exists
        const checkSql = `SELECT * FROM user WHERE username = ? OR email = ?`;
        db.query(checkSql, [userData.username, userData.email], (err, results) => {
            if (err) return callback(err, null);

            if (results.length > 0) {
                return callback({ message: "Username or email already exists" }, null);
            }

            // Hash password before saving
            bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
                if (err) return callback(err, null);

                // Insert user with image
                const sql = `INSERT INTO user (image, username, password, name, email, telephone_number, role, region, address)  
                             VALUES (?, ?, ?, ?, ?, ?, 'point_vente', ?, ?)`;  // Role is always 'point_vente'
                
                db.query(sql, [
                    image,
                    userData.username,
                    hashedPassword,
                    userData.name,
                    userData.email,
                    userData.telephone_number,
                    userData.region,
                    userData.address
                ], (err, result) => {
                    if (err) return callback(err, null);

                    const userId = result.insertId; // Get auto-generated user ID

                    // Insert into sale_point table
                    const salePointSql = `INSERT INTO sale_point (user_id, store_hours) VALUES (?, ?)`;
                    db.query(salePointSql, [userId, userData.store_hours], (err, salePointResult) => {
                        if (err) return callback(err, null);
                        callback(null, { userId, role: "point_vente" }); // Return success response
                    });
                });
            });
        });
    }
};

module.exports = SalePoint;