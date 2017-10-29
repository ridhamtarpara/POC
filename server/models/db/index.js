const mysql = require('mysql');
const Promise = require('bluebird');
const config = require('../../../config');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool({
    host: config.db..host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config..db.database
});

function getSqlConnection() {
    return pool.getConnectionAsync().disposer((connection) => {
        // release connection
        connection.release();
    });
}

function querySql(query, params) {
    // get connection
    return Promise.using(getSqlConnection(), (connection) => {
        if (typeof params !== 'undefined') {
            return connection.queryAsync(query, params);
        } else {
            return connection.queryAsync(query);
        }
    });
}

module.exports = {
    getSqlConnection,
    querySql
};
