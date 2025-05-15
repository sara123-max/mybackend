const pool = require('../../pool');

class DeletePointVenteModel {
  static async deletePointVente(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // First delete from sale_point table
      await connection.query('DELETE FROM sale_point WHERE user_id = ?', [id]);

      // Then delete from user table
      const [userResult] = await connection.query(
        'DELETE FROM user WHERE id = ? AND role = "point_vente"', 
        [id]
      );

      if (userResult.affectedRows === 0) {
        await connection.rollback();
        throw new Error('Point de vente not found or wrong role');
      }

      await connection.commit();
      return { message: 'Point de vente deleted successfully' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = DeletePointVenteModel;