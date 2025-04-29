/*const pool = require('../pool');

class CatalogueAddProducts {
  static async updateNameAndAddProducts(catalogueId, name, productIds) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Update name if provided
      if (name) {
        await connection.query(
          'UPDATE catalogue SET name = ? WHERE id = ?',
          [name, catalogueId]
        );
      }

      // 2. Add products if provided
      if (productIds?.length > 0) {
        const values = productIds.map(pid => [catalogueId, pid]);
        await connection.query(
          'INSERT IGNORE INTO catalogue_product (catalogue_id, product_id) VALUES ?',
          [values]
        );
      }

      await connection.commit();
      
      // Return simple success (no DB fetch)
      return { success: true };
      
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = CatalogueAddProducts;*/
const pool = require('../pool');

class CatalogueAddProducts {
  static async updateCatalogue(catalogueId, name, productIds, grossitesToAdd, grossitesToRemove) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Update name if provided
      if (name) {
        await connection.query(
          'UPDATE catalogue SET name = ? WHERE id = ?',
          [name, catalogueId]
        );
      }

      // 2. Add products if provided
      if (productIds?.length > 0) {
        const values = productIds.map(pid => [catalogueId, pid]);
        await connection.query(
          'INSERT IGNORE INTO catalogue_product (catalogue_id, product_id) VALUES ?',
          [values]
        );
      }

      // 3. Handle grossite additions
      if (grossitesToAdd?.length > 0) {
        const addValues = grossitesToAdd.map(gid => [catalogueId, gid]);
        await connection.query(
          'INSERT IGNORE INTO catalogue_grossiste (catalogue_id, grossiste_user_id) VALUES ?',
          [addValues]
        );
      }

      // 4. Handle grossite removals
      if (grossitesToRemove?.length > 0) {
        await connection.query(
          'DELETE FROM catalogue_grossiste WHERE catalogue_id = ? AND grossiste_user_id IN (?)',
          [catalogueId, grossitesToRemove]
        );
      }

      await connection.commit();
      return { success: true };
      
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = CatalogueAddProducts;