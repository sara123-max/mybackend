const db = require("../../db");

const getAllSalePoints = (callback) => {
  const sql = `
    SELECT u.*, sp.store_hours 
    FROM user u
    JOIN sale_point sp ON u.id = sp.user_id
    WHERE u.role = 'point_vente'
  `;
  db.query(sql, callback);
};

module.exports = {
  getAllSalePoints
};