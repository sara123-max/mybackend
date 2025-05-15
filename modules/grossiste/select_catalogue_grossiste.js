const db = require('../../db');

const getGrossisteCatalogues = (grossisteUserId, callback) => {
    const query = `
        SELECT 
            cat.id AS catalogue_id,
            cat.name AS catalogue_name,
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
        FROM catalogue cat
        JOIN catalogue_grossiste cg ON cat.id = cg.catalogue_id
        LEFT JOIN catalogue_product cp ON cat.id = cp.catalogue_id
        LEFT JOIN products p ON cp.product_id = p.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
        WHERE cg.grossiste_user_id = ?
        ORDER BY cat.created_at DESC, p.created_at DESC
    `;

    db.query(query, [grossisteUserId], (err, results) => {
        if (err) return callback(err);
        
        // Group products by catalogue
        const cataloguesMap = new Map();
        
        results.forEach(row => {
            if (!cataloguesMap.has(row.catalogue_id)) {
                cataloguesMap.set(row.catalogue_id, {
                    id: row.catalogue_id,
                    name: row.catalogue_name,
                    products: []
                });
            }
            
            const catalogue = cataloguesMap.get(row.catalogue_id);
            
            if (row.product_id) { // Only add if product exists
                const product = {
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
                    category_name: row.category_name,
                    subcategory_name: row.subcategory_name
                };
                
                catalogue.products.push(product);
            }
        });
        
        // Convert map to array
        const catalogues = Array.from(cataloguesMap.values());
        
        callback(null, catalogues);
    });
};

module.exports = { getGrossisteCatalogues };