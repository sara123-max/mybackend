const db = require('../db');

const getProducts = (callback) => {
    const query = `
        SELECT 
            p.*,
            c.name AS category_name,
            sc.name AS subcategory_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN subcategories sc ON p.subcategory_id = sc.id
        ORDER BY p.created_at DESC
    `;

    db.query(query, (err, results) => {
        if (err) return callback(err);
        
        // Convert image buffer to base64 for API response
        const products = results.map(product => ({
            ...product,
            image: product.image ? product.image.toString('base64') : null
        }));
        
        callback(null, products);
    });
};

module.exports = { getProducts };