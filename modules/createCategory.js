/*const db = require('../db');

// Function to insert a new category
const createCategory = (name, image, callback) => {
    const sql = 'INSERT INTO categories (name, image) VALUES (?, ?)';
    db.query(sql, [name, image], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = { createCategory };*/
const db = require('../db');

const createCategory = (name, image, subcategories, callback) => {
    db.beginTransaction(async (err) => {
        if (err) return callback(err);

        try {
            // 1. Insert main category
            const categoryResult = await new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO categories (name, image) VALUES (?, ?)',
                    [name, image],
                    (err, result) => err ? reject(err) : resolve(result)
                );
            });

            const categoryId = categoryResult.insertId;

            // 2. Insert subcategories (controller ensures they exist)
            const subPromises = subcategories.map(sub => {
                return new Promise((resolve, reject) => {
                    db.query(
                        'INSERT INTO subcategories (name, category_id) VALUES (?, ?)',
                        [sub, categoryId],
                        (err, result) => err ? reject(err) : resolve(result)
                    );
                });
            });

            const subResults = await Promise.all(subPromises);
            
            // Commit transaction
            db.commit((err) => {
                if (err) return db.rollback(() => callback(err));
                callback(null, { 
                    categoryId,
                    subcategoryIds: subResults.map(r => r.insertId) 
                });
            });
        } catch (error) {
            db.rollback(() => callback(error));
        }
    });
};
// GET CATEGORY BY ID (NEW FUNCTION)
const getCategoryById = (categoryId, callback) => {
    const query = `
        SELECT 
            c.*, 
            JSON_ARRAYAGG(s.name) AS subcategories 
        FROM categories c
        LEFT JOIN subcategories s ON c.id = s.category_id
        WHERE c.id = ?
        GROUP BY c.id
    `;

    db.query(query, [categoryId], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null);
        
        const category = {
            ...results[0],
            subcategories: results[0].subcategories || [],
            image_url: results[0].image
        };
        callback(null, category);
    });
};

module.exports = { 
    createCategory,
    getCategoryById 
};

