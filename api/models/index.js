const mysql = require('mysql2/promise');

async function getConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'welcome',
    database: 'poc',
  });
  return connection;
}


module.exports = getConnection();
