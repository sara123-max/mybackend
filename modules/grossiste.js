
const db = require("../db"); // Import database connection
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

const Grossiste = {
    // Create a new grossiste (user + grossiste entry)
    createGrossiste: (userData, image, callback) => {
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

                // Insert user with image in the first position
                const sql = `INSERT INTO user (image, username, password, name, email, telephone_number, role, region, address)  
                             VALUES (?, ?, ?, ?, ?, ?, 'grossiste', ?, ?)`;  // Role is always 'grossiste'
                
                db.query(sql, [
                    image, // Now image is in the first position
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

                    // Insert into grossiste table
                    const grossisteSql = `INSERT INTO grossiste (user_id) VALUES (?)`;
                    db.query(grossisteSql, [userId], (err, grossisteResult) => {
                        if (err) return callback(err, null);
                        callback(null, { userId, role: "grossiste" }); // Return success response
                    });
                });
            });
        });
    }
};

module.exports = Grossiste;


