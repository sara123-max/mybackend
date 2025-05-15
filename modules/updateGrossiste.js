
const db = require("../db");

class GrossisteUpdate {
  static findById(id, callback) {
    db.query('SELECT * FROM user WHERE id = ? AND role = "grossiste"', [id], (err, results) => {
      if (err) {
        console.error('Error finding grossiste by ID:', err);
        return callback(err, null);
      }
      callback(null, results.length ? results[0] : null);
    });
  }

  static update(id, grossisteData, callback) {
    const { name, username, password, email, telephone_number, address, region } = grossisteData;

    // First, check if the grossiste exists in users table
    this.findById(id, (err, grossiste) => {
      if (err) return callback(err, null);
      if (!grossiste) return callback(new Error('Grossiste not found'), null);

      const query = `
      UPDATE user
      SET name = ?, username = ?, password = ?, email = ?, 
          telephone_number = ?, address = ?, region = ?
      WHERE id = ? AND role = "grossiste"
    `;

      db.query(query, [name, username, password, email, telephone_number, address, region, id], (err, result) => {
        if (err) {
          console.error('Error updating grossiste:', err);
          return callback(err, null);
        }

        if (result.affectedRows === 0) {
          return callback(new Error('Failed to update grossiste'), null);
        }

        // Fetch the updated record
        GrossisteUpdate.findById(id, callback);
      });
    });
  }
}

module.exports = GrossisteUpdate;

