const pool = require('../db');

class DeleteModel {
  static deleteGrossiste(id, callback) {
    const query = 'DELETE FROM user WHERE id = ? AND role = "grossiste"'; // Use the correct table and filter by role
    
    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null); // if an error occurs, return it
      } else if (result.affectedRows === 0) {
        callback(new Error('Grossiste not found or wrong role'), null); // if no rows are deleted, return an error
      } else {
        // Optionally, you can query the deleted record if needed
        const fetchQuery = 'SELECT * FROM user WHERE id = ? AND role = "grossiste"';
        pool.query(fetchQuery, [id], (err, rows) => {
          if (err) {
            callback(err, null); // if an error occurs while fetching, return it
          } else {
            callback(null, rows[0]); // return the deleted row
          }
        });
      }
    });
  }
}

module.exports = DeleteModel;

