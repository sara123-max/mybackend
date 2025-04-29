// models/grossiste.js
/*const db = require("../db"); 

class grossisteUpdate {
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM grossistes WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error finding grossiste by ID:', error);
      throw error;
    }
  }

  static async update(id, grossisteData) {
    try {
      const { name, username, password, email, telephone_number, address, region } = grossisteData;
      
      // Check if grossiste exists
      const grossiste = await this.findById(id);
      if (!grossiste) {
        throw new Error('Grossiste not found');
      }
      
      // Update the grossiste
      const query = `
        UPDATE grossistes
        SET name = ?, 
            username = ?, 
            password = ?, 
            email = ?, 
            telephone_number = ?, 
            address = ?, 
            region = ?, 
            updated_at = NOW()
        WHERE id = ?
      `;
      
      const [result] = await db.query(query, [
        name, 
        username, 
        password, // Note: In production, you should hash passwords
        email,
        telephone_number,
        address,
        region,
        id
      ]);
      
      if (result.affectedRows === 0) {
        throw new Error('Failed to update grossiste');
      }
      
      // Return the updated grossiste
      return await this.findById(id);
    } catch (error) {
      console.error('Error updating grossiste:', error);
      throw error;
    }
  }
}

module.exports = grossisteUpdate;*/
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

