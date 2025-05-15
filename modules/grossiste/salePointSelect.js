/*const db = require("../../db");

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
};*/
const db = require("../../db");

const getAllSalePoints = (grossisteId, callback) => {
  console.log('Executing query for grossisteId:', grossisteId);

  const sql = `
    SELECT u.*, sp.store_hours, sp.grossiste_id
    FROM user u
    JOIN sale_point sp ON u.id = sp.user_id
    WHERE u.role = 'point_vente' AND sp.grossiste_id = ?
  `;
  
  db.query(sql, [grossisteId], callback);
};

module.exports = {
  getAllSalePoints
};