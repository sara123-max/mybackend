/*const db = require('../db');

class SingleCatalogue {
  static findByIdWithProducts(id, callback) {
    // First get the catalogue details
    const catalogueQuery = `
      SELECT 
        id,
        name
      FROM catalogue
      WHERE id = ?
    `;

    db.query(catalogueQuery, [id], (err, catalogueResults) => {
      if (err) return callback(err);
      if (catalogueResults.length === 0) return callback(null, null);

      const catalogue = catalogueResults[0];

      // Then get all products for this catalogue
      const productsQuery = `
        SELECT 
          p.id AS product_id,
          p.name AS product_name,
          p.price,
          p.image,
          p.stock_quantity,
          p.brand,
          p.status,
          p.rating,
          p.discount_price,
          p.weight,
          p.dimensions,
          p.color,
          p.description,
          p.expiration_date,
          p.shipping_details,
          c.name AS category_name,
          sc.name AS subcategory_name 
        FROM products p
        JOIN catalogue_product cp ON p.id = cp.product_id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
        WHERE cp.catalogue_id = ?
        ORDER BY p.created_at DESC
      `;

      db.query(productsQuery, [id], (err, productResults) => {
        if (err) return callback(err);

        // Format products using the exact same strategy as your catalogue query
        const products = productResults.map(row => ({
          id: row.product_id,
          name: row.product_name,
          price: row.price,
          image: row.image ? row.image.toString('base64') : null,
          stock_quantity: row.stock_quantity,
          brand: row.brand,
          status: row.status,
          rating: row.rating,
          discount_price: row.discount_price,
          weight: row.weight,
          dimensions: row.dimensions,
          color: row.color,
          description: row.description,
          expiration_date: row.expiration_date,
          shipping_details: row.shipping_details,
          category_id: row.category_name,  // Changed from category_name to category_id
          subcategory_id: row.subcategory_name  // Changed from subcategory_name to subcategory_id
        }));
        //imeant subcategory_name  not 
        // exatly subcategory_id and category_name  not exatly category_id

        // Return the complete catalogue with products
        callback(null, {
          ...catalogue,
          products: products
        });
      });
    });
  }
}

module.exports = SingleCatalogue;*/
const db = require('../db');

class SingleCatalogue {
static findByIdWithProducts(id, callback) {
  // First get the catalogue details
  const catalogueQuery = `
    SELECT 
      c.id,
      c.name
    FROM catalogue c
    WHERE c.id = ?
  `;

  db.query(catalogueQuery, [id], (err, catalogueResults) => {
    if (err) return callback(err);
    if (catalogueResults.length === 0) return callback(null, null);

    const catalogue = catalogueResults[0];

    // Get all products for this catalogue
    const productsQuery = `
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
         p.price,
          p.image,
          p.stock_quantity,
          p.brand,
          p.status,
          p.rating,
          p.discount_price,
          p.weight,
          p.dimensions,
          p.color,
          p.description,
          p.expiration_date,
          p.shipping_details,
          c.name AS category_name,
          sc.name AS subcategory_name 
      FROM products p
      JOIN catalogue_product cp ON p.id = cp.product_id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
      WHERE cp.catalogue_id = ?
      ORDER BY p.created_at DESC
    `;

    // NEW: Get grossiste IDs for this catalogue
    const grossistesQuery = `
      SELECT grossiste_user_id 
      FROM catalogue_grossiste 
      WHERE catalogue_id = ?
    `;

    // Execute both queries in parallel
    db.query(productsQuery, [id], (err, productResults) => {
      if (err) return callback(err);

      db.query(grossistesQuery, [id], (err, grossisteResults) => {
        if (err) return callback(err);

        // Format products
        const products = productResults.map(row => ({
          id: row.product_id,
          name: row.product_name,
          price: row.price,
          image: row.image ? row.image.toString('base64') : null,
          stock_quantity: row.stock_quantity,
          brand: row.brand,
          status: row.status,
          rating: row.rating,
          discount_price: row.discount_price,
          weight: row.weight,
          dimensions: row.dimensions,
          color: row.color,
          description: row.description,
          expiration_date: row.expiration_date,
          shipping_details: row.shipping_details,
          category_id: row.category_name,  // Changed from category_name to category_id
          subcategory_id: row.subcategory_name  // Changed from subcategory_name to subcategory_id
        }));

        // Extract grossiste IDs
        const grossiteIds = grossisteResults.map(row => row.grossiste_user_id);

        // Return complete catalogue with products AND grossiteIds
        callback(null, {
          ...catalogue,
          products: products,
          grossiteIds: grossiteIds
        });
      });
    });

  });
}
}
module.exports = SingleCatalogue;