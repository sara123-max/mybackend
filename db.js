// db.js
const mysql = require('mysql2');

// Create the connection to the database
const db = mysql.createConnection({
  host: 'localhost',  // Your MySQL host (usually localhost)
  user: 'root',       // Your MySQL username
  password: 'sara123',       // Your MySQL password (leave empty if no password)
  database: 'gestion_de_ventes_en_gros' // Your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Export the connection to use it in other modules
module.exports = db;