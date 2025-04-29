const pool = require('../pool');

class CatalogueDelete {
  static async deleteCatalogue(catalogueId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // First delete all product associations
      await connection.query(
        'DELETE FROM catalogue_product WHERE catalogue_id = ?',
        [catalogueId]
      );

      // Then delete the catalogue itself
      const [result] = await connection.query(
        'DELETE FROM catalogue WHERE id = ?',
        [catalogueId]
      );

      await connection.commit();
      
      return { 
        success: true,
        affectedRows: result.affectedRows
      };
      
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = CatalogueDelete;