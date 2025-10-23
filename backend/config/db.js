const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // replace with your MySQL username
  password: 'Jaya@2004', // replace with your MySQL password
  database: 'itams_db'
});

module.exports = pool.promise();
