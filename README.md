# Public-API-bittrex-poloniex

### Steps to start

  - Create `poc` database and run following query
  ```
  CREATE TABLE `marketdata` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` float DEFAULT NULL,
  `coin` varchar(12) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `exchange` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
  ```
  - set development variable in `config/env/development.js`
  ```
  module.exports = {
	application: {
		env: 'development',
		hostName: 'localhost',
		httpPort: 3000,
	},
	db: {
		host: 'localhost',
		username: 'root',
		password: 'xyz',
		database: 'poc',
		port: 3306
	},
	cronTime: '0 */10 * * * *',
	exchanges: ['bittrex', 'poloniex', 'coinsecure', 'coinmate', 'flowbtc', 'gatecoin']
};

  ```
  - run following command
  ```
    npm install
    npm start
  ```

### Improvements

  - Instead of using raw `mysql` package, ORM like `sequelize` can be used.
  - use .env files instead file config folder
  - Pagination in the API of coin info and exchange
  - use backpack or gulp to create a build and other tasks
  - Use babel to code in ES6/7
