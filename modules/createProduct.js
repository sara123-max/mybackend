const db = require('../db');

const createProduct = (productData, callback) => {
  const sql = `
    INSERT INTO products (
      name, price, image, category_id, subcategory_id, stock_quantity,
      brand, status, rating, discount_price, weight, dimensions, color,
      description, expiration_date, supplier_id, shipping_details
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Use the Buffer directly for DB storage
  const values = [
    productData.name,
    productData.price,
    productData.image, // Buffer goes straight to LONGBLOB
    productData.category_id,
    productData.subcategory_id,
    productData.stock_quantity,
    productData.brand,
    productData.status || 'active',
    productData.rating || 0.00,
    productData.discount_price,
    productData.weight,
    productData.dimensions,
    productData.color,
    productData.description,
    productData.expiration_date,
    productData.supplier_id,
    productData.shipping_details
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    
    // Return the original productData including the Buffer
    callback(null, {
      id: result.insertId,
      ...productData
    });
  });
};

module.exports = { createProduct };