const db = require('../db');

const getProductById = (productId, callback) => {
    const sql = `
      SELECT p.*, 
             c.name as category_name, 
             s.name as subcategory_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.id = ?
    `;
  
    db.query(sql, [productId], (err, results) => {
      if (err) return callback(err);
      
      if (results.length === 0) {
        return callback({ message: "Product not found" });
      }
      
      // Process the image buffer
      const product = results[0];
      let imageString = null;
      
      if (product.image && Buffer.isBuffer(product.image)) {
        // Convert buffer to Base64 string
        imageString = product.image.toString('base64');
        
        // If you want to include the data URI prefix (optional)
        // imageString = `data:image/jpeg;base64,${imageString}`;
      }
      
      // Return product with category and subcategory names and converted image
      const formattedProduct = {
        ...product,
        category: product.category_name,
        subcategory: product.subcategory_name,
        image: imageString  // Replace buffer with Base64 string
      };
      
      // Remove the original buffer if it's still there
      delete formattedProduct.image_buffer;
      
      callback(null, formattedProduct);
    });
  };

module.exports = { getProductById };