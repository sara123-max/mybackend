/*const db = require('../db'); // Import database connection
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const User = {

    // 2️⃣ Create a new user with hashed password
    createUser: (userData, callback) => {
        // Hash the password before storing it
        bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
            if (err) return callback(err, null);

            const sql = `INSERT INTO user (id, username, password, name, email, telephone_number, role, region, address) 
                         VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(sql, [
                userData.username, 
                hashedPassword, // Store hashed password
                userData.name, 
                userData.email, 
                userData.telephone_number, 
                userData.role, //think abt it
                userData.region, 
                userData.address
            ], callback);
        });
    },

    // 3️⃣ Retrieve a user by username
    getUserByUsername: (username, callback) => {
        const sql = `SELECT * FROM user WHERE username = ?`;
        db.query(sql, [username], callback);
    },

    // 4️⃣ Verify user credentials (Login Function)
    authenticateUser: (username, password, callback) => {
        const sql = `SELECT * FROM user WHERE username = ?`;
        db.query(sql, [username], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, false); // No user found

            const user = results[0];

            // Compare the provided password with the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return callback(err, null);
                if (!isMatch) return callback(null, false); // Password incorrect
                callback(null, user); // Password correct, return user
            });
        });
    },
    
    // 5️⃣ Update user details
    updateUser: (id, updatedData, callback) => {
        // Check if a new password is provided
        if (updatedData.password) {
            // Hash the new password before updating
            bcrypt.hash(updatedData.password, 10, (err, hashedPassword) => {
                if (err) return callback(err, null);
                updatedData.password = hashedPassword;
                updateUserInDB(id, updatedData, callback);
            });
        } else {
            updateUserInDB(id, updatedData, callback);
        }
    },
        // 6️⃣ Delete a user by ID
        deleteUser: (id, callback) => {
            const sql = `DELETE FROM user WHERE id = ?`;
            db.query(sql, [id], callback);
        }
};

// Helper function to update user data in the database
function updateUserInDB(id, updatedData, callback) {
    let fields = [];
    let values = [];

    for (const key in updatedData) {
        fields.push(`${key} = ?`);
        values.push(updatedData[key]);
    }

    const sql = `UPDATE user SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, callback);
}

// Export the User module
module.exports = User;
*/
/*const db = require('../db'); // Import database connection
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const Grossiste = {
    // Create a new grossiste (user + grossiste entry)
    createGrossiste: (userData, callback) => {
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

                const sql = `INSERT INTO user (username, password, name, email, telephone_number, role, region, address) 
                            VALUES (?, ?, ?, ?, ?, 'grossiste', ?, ?)`;  // Role is always 'grossiste'
                
                db.query(sql, [
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
*/
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


