const pool = require('../../db');

class DeletePointVenteModel {
  static deletePointVente(id, callback) {
    // Start a transaction as we need to delete from two tables
    pool.getConnection((err, connection) => {
      if (err) return callback(err, null);

      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          return callback(err, null);
        }

        try {
          // First delete from sale_point table
          const deleteSalePointQuery = 'DELETE FROM sale_point WHERE user_id = ?';
          const [salePointResult] = await connection.promise().query(deleteSalePointQuery, [id]);

          // Then delete from user table
          const deleteUserQuery = 'DELETE FROM user WHERE id = ? AND role = "point_vente"';
          const [userResult] = await connection.promise().query(deleteUserQuery, [id]);

          if (userResult.affectedRows === 0) {
            await connection.rollback();
            connection.release();
            return callback(new Error('Point de vente not found or wrong role'), null);
          }

          await connection.commit();
          connection.release();
          callback(null, { message: 'Point de vente deleted successfully' });
        } catch (error) {
          await connection.rollback();
          connection.release();
          callback(error, null);
        }
      });
    });
  }
}

module.exports = DeletePointVenteModel;