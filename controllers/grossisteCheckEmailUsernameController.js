const db = require('../db'); // Import your database connection

// Function to check if username or email exists
exports.checkUsernameEmailExists = (req, res) => {
    const { username, email } = req.body;

    let query = 'SELECT username, email FROM user WHERE username = ? OR email = ?';
    db.query(query, [username, email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        // Prepare response
        let exists = {
            username: results.some(user => user.username === username),
            email: results.some(user => user.email === email)
        };

        return res.json(exists);
    });
};


