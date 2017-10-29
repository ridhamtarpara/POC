const mysql = require('mysql');
const Promise = require('bluebird');
const config = require('config');

const dbConfig = config.get('db');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
});

function getSqlConnection() {
  return pool.getConnectionAsync().disposer(connection => {
    // release connection
    connection.release();
  });
}

function querySql(query, params) {
  // get connection
  return Promise.using(getSqlConnection(), connection => {
    if (typeof params !== 'undefined') {
      return connection.queryAsync(query, params);
    }
    return connection.queryAsync(query);
  });
}

module.exports = {
  getSqlConnection,
  querySql,
};
