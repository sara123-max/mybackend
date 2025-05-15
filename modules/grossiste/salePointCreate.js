// modules/grossiste/salePointCreate.js
const db = require("../../db");
const bcrypt = require("bcryptjs");

const SalePoint = {
    createSalePoint: (userData, image, grossiste_id, callback) => {
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
                             VALUES (?, ?, ?, ?, ?, ?, 'point_vente', ?, ?)`;
                
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

                    const userId = result.insertId;

                    // Insert into sale_point table with grossiste_id
                    const salePointSql = `INSERT INTO sale_point (user_id, store_hours, grossiste_id) VALUES (?, ?, ?)`;
                    db.query(salePointSql, 
                        [userId, userData.store_hours, grossiste_id], 
                        (err, salePointResult) => {
                            if (err) return callback(err, null);
                            callback(null, { 
                                userId, 
                                role: "point_vente",
                                grossiste_id: grossiste_id
                            });
                        }
                    );
                });
            });
        });
    }
};

module.exports = SalePoint;