const db = require("../db");  // Assuming your DB connection is in a separate file

// Function to get all grossistes from the database
const getAllGrossistes = (callback) => {
  const sql = "SELECT * FROM user WHERE role = 'grossiste'";
  db.query(sql, callback);
};
// Export as an object with methods
module.exports = {
  getAllGrossistes, // ✅ Now accessible via SelectGrossiste.getAllGrossistes()
};

