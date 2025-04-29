const pool = require('../pool');

class CatalogueDeleteProducts {
  static async deleteProducts(catalogueId, productIds) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Validate we have products to delete
      if (!productIds?.length) {
        throw new Error('No product IDs provided for deletion');
      }

      // Delete the products from catalogue
      await connection.query(
        'DELETE FROM catalogue_product WHERE catalogue_id = ? AND product_id IN (?)',
        [catalogueId, productIds]
      );

      await connection.commit();
      
      return { 
        success: true,
        deletedCount: productIds.length
      };
      
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = CatalogueDeleteProducts;