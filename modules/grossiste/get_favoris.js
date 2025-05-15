const db = require('../../db');

const getGrossisteFavoris = (grossisteId, callback) => {
    const query = `
        SELECT 
            f.salepoint_id,
            p.*,
            c.name AS category_name,
            sc.name AS subcategory_name
        FROM favoris f
        INNER JOIN sale_point sp ON f.salepoint_id = sp.user_id
        INNER JOIN products p ON f.product_id = p.id
        INNER JOIN categories c ON p.category_id = c.id
        INNER JOIN subcategories sc ON p.subcategory_id = sc.id
        WHERE sp.grossiste_id = ?
        ORDER BY f.salepoint_id, p.name
    `;

    db.query(query, [grossisteId], (err, results) => {
        if (err) return callback(err);
        
        // Group products by salepoint_id
        const groupedFavoris = results.reduce((acc, row) => {
            const salepointId = row.salepoint_id;
            
            if (!acc.has(salepointId)) {
                acc.set(salepointId, {
                    salepoint_id: salepointId,
                    products: []
                });
            }
            
            acc.get(salepointId).products.push({
                id: row.id,
                name: row.name,
                price: row.price,
                image: row.image?.toString('base64'),
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
                category_id: row.category_name,
                subcategory_id: row.subcategory_name
            });
            
            return acc;
        }, new Map());
        
        callback(null, Array.from(groupedFavoris.values()));
    });
};

module.exports = { getGrossisteFavoris };