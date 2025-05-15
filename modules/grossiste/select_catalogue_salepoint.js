const db = require('../../db');

const getSalepointCatalogues = (grossisteId, callback) => {
    const query = `
        SELECT 
            cat.id AS catalogue_id,
            cat.name AS catalogue_name,
            GROUP_CONCAT(DISTINCT sp.user_id) AS salepoint_ids,
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
        INNER JOIN catalogue_salepoint cs ON cat.id = cs.catalogue_id
        INNER JOIN sale_point sp ON cs.salepoint_id = sp.user_id
        LEFT JOIN catalogue_product cp ON cat.id = cp.catalogue_id
        LEFT JOIN products p ON cp.product_id = p.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
        WHERE sp.grossiste_id = ?
        GROUP BY cat.id, p.id
        ORDER BY cat.created_at DESC, p.created_at DESC
    `;

    db.query(query, [grossisteId], (err, results) => {
        if (err) return callback(err);
        
        // Group products and salepoints by catalogue
        const cataloguesMap = new Map();
        
        results.forEach(row => {
            if (!cataloguesMap.has(row.catalogue_id)) {
                cataloguesMap.set(row.catalogue_id, {
                    id: row.catalogue_id,
                    name: row.catalogue_name,
                    salepointIds: row.salepoint_ids 
                        ? row.salepoint_ids.split(',').map(Number) 
                        : [],
                    products: []
                });
            }
            
            const catalogue = cataloguesMap.get(row.catalogue_id);
            
            if (row.product_id) {
                const product = {
                    id: row.product_id,
                    name: row.product_name,
                    price: row.price,
                    image: row.image?.toString('base64'),
                    // ... other product fields ...
                };
                
                catalogue.products.push(product);
            }
        });
        
        callback(null, Array.from(cataloguesMap.values()));
    });
};

module.exports = { getSalepointCatalogues };