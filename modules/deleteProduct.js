const pool = require('../db');

class DeleteProduct {
  static deleteProduct(id, callback) {
    const query = 'DELETE FROM products WHERE id = ?';
    
    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null);
      } else if (result.affectedRows === 0) {
        callback(new Error('Product not found'), null);
      } else {
        // Optionally fetch the deleted product details
        const fetchQuery = 'SELECT * FROM products WHERE id = ?';
        pool.query(fetchQuery, [id], (err, rows) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, rows[0]);
          }
        });
      }
    });
  }
}

module.exports = DeleteProduct;