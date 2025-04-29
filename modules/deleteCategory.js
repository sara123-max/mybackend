const pool = require('../db');

class DeleteCategory {
  static deleteCategory(id, callback) {
    // First delete all subcategories of this category
    const deleteSubcategoriesQuery = 'DELETE FROM subcategories WHERE category_id = ?';
    
    pool.query(deleteSubcategoriesQuery, [id], (err, subcatResult) => {
      if (err) {
        return callback(err, null);
      }

      // Then delete the category itself
      const deleteCategoryQuery = 'DELETE FROM categories WHERE id = ?';
      
      pool.query(deleteCategoryQuery, [id], (err, catResult) => {
        if (err) {
          callback(err, null);
        } else if (catResult.affectedRows === 0) {
          callback(new Error('Category not found'), null);
        } else {
          // Optionally fetch the deleted category details
          const fetchQuery = 'SELECT * FROM categories WHERE id = ?';
          pool.query(fetchQuery, [id], (err, rows) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, {
                category: rows[0],
                subcategoriesDeleted: subcatResult.affectedRows
              });
            }
          });
        }
      });
    });
  }
}

module.exports = DeleteCategory;