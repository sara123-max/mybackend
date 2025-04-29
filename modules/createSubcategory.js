const db = require('../db');

const createSubcategory = (name, category_id, status = 'active', callback) => {
  const sql = `INSERT INTO subcategories 
               (name, category_id, status) 
               VALUES (?, ?, ?)`;
  
  db.query(sql, [name, category_id, status], (err, result) => {
    if (err) return callback(err);
    callback(null, {
      id: result.insertId,
      name,
      category_id,
      status
    });
  });
};

module.exports = { createSubcategory };