const db = require('../db');

class Category {
  static findAll(callback) {
    // First, get all categories
    const categoryQuery = `
      SELECT 
        id,
        name,
        image,
        created_at,
        updated_at
      FROM categories
    `;
    
    db.query(categoryQuery, (err, categoryResults) => {
      if (err) return callback(err);
      
      // Process each category to get its subcategories
      const categories = [];
      let completed = 0;
      
      if (categoryResults.length === 0) {
        return callback(null, []);
      }
      
      categoryResults.forEach(category => {
        // For each category, get all its subcategories
        const subcategoryQuery = `
          SELECT 
            id,
            name,
            category_id
          FROM subcategories
          WHERE category_id = ?
        `;
        
        db.query(subcategoryQuery, [category.id], (err, subcategoryResults) => {
          if (err) return callback(err);
          
          // Format subcategories
          const subCategories = subcategoryResults.map(sub => ({
            id: sub.id,
            name: sub.name,
            categoryId: sub.category_id
          }));
          
          // Add category with subcategories to result
          categories.push({
            id: category.id,
            name: category.name,
            image: category.image && Buffer.isBuffer(category.image) ? 
                   category.image.toString('base64') : 
                   category.image,
            subCategories: subCategories,
            createdAt: category.created_at,
            updatedAt: category.updated_at
          });
          
          completed++;
          
          // When all categories are processed, return the result
          if (completed === categoryResults.length) {
            callback(null, categories);
          }
        });
      });
    });
  }

  static findById(id, callback) {
    // Get the category
    const categoryQuery = `
      SELECT 
        id,
        name,
        image,
        created_at,
        updated_at
      FROM categories
      WHERE id = ?
    `;
    
    db.query(categoryQuery, [id], (err, categoryResults) => {
      if (err) return callback(err);
      if (categoryResults.length === 0) return callback(null, null);
      
      const category = categoryResults[0];
      
      // Get subcategories for this category
      const subcategoryQuery = `
        SELECT 
          id,
          name,
          category_id
        FROM subcategories
        WHERE category_id = ?
      `;
      
      db.query(subcategoryQuery, [id], (err, subcategoryResults) => {
        if (err) return callback(err);
        
        // Format subcategories
        const subCategories = subcategoryResults.map(sub => ({
          id: sub.id,
          name: sub.name,
          categoryId: sub.category_id
        }));
        
        // Return the complete category with subcategories
        callback(null, {
          id: category.id,
          name: category.name,
          image: category.image && Buffer.isBuffer(category.image) ?
                 category.image.toString('base64') :
                 category.image,
          subCategories: subCategories,
          createdAt: category.created_at,
          updatedAt: category.updated_at
        });
      });
    });
  }
}

module.exports = Category;