const db = require("../../db");

class PointVenteUpdate {
  static findById(id, callback) {
    db.query('SELECT * FROM user WHERE id = ? AND role = "point_vente"', [id], (err, results) => {
      if (err) {
        console.error('Error finding point de vente by ID:', err);
        return callback(err, null);
      }
      callback(null, results.length ? results[0] : null);
    });
  }

  static update(id, pointVenteData, callback) {
    const { name, username, password, email, telephone_number, address, region, store_hours } = pointVenteData;

    // Start transaction
    db.getConnection((err, connection) => {
      if (err) return callback(err, null);

      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          return callback(err, null);
        }

        try {
          // First, check if the point_vente exists
          const [pointVente] = await connection.promise().query(
            'SELECT * FROM user WHERE id = ? AND role = "point_vente"', 
            [id]
          );

          if (!pointVente.length) {
            await connection.rollback();
            connection.release();
            return callback(new Error('Point de vente not found'), null);
          }

          // Update user table
          const updateUserQuery = `
            UPDATE user
            SET name = ?, username = ?, password = ?, email = ?, 
                telephone_number = ?, address = ?, region = ?
            WHERE id = ? AND role = "point_vente"
          `;
          const [userResult] = await connection.promise().query(
            updateUserQuery, 
            [name, username, password, email, telephone_number, address, region, id]
          );

          if (userResult.affectedRows === 0) {
            await connection.rollback();
            connection.release();
            return callback(new Error('Failed to update point de vente in user table'), null);
          }

          // Update sale_point table
          const updateSalePointQuery = `
            UPDATE sale_point
            SET store_hours = ?
            WHERE user_id = ?
          `;
          const [salePointResult] = await connection.promise().query(
            updateSalePointQuery,
            [store_hours, id]
          );

          if (salePointResult.affectedRows === 0) {
            await connection.rollback();
            connection.release();
            return callback(new Error('Failed to update sale point details'), null);
          }

          await connection.commit();
          connection.release();

          // Fetch the updated record
          const [updatedPointVente] = await connection.promise().query(
            `SELECT u.*, sp.store_hours 
             FROM user u 
             JOIN sale_point sp ON u.id = sp.user_id 
             WHERE u.id = ? AND u.role = "point_vente"`,
            [id]
          );

          callback(null, updatedPointVente[0]);
        } catch (error) {
          await connection.rollback();
          connection.release();
          callback(error, null);
        }
      });
    });
  }
}

module.exports = PointVenteUpdate;