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

### API
##### GET a specific coin information :

```
ENDPOINT: http://34.230.17.205:3010/coin-price?pair=BTC-USDT
OUTPUT:
{
    "status": "OK",
    "info": [
        {
            "id": 770,
            "value": 5821.04,
            "coin": "BTC-USDT",
            "updated": "2017-10-29T11:20:00.000Z",
            "exchange": "poloniex"
        },
        {
            "id": 1080,
            "value": 5808.91,
            "coin": "BTC-USDT",
            "updated": "2017-10-29T11:19:39.000Z",
            "exchange": "bittrex"
        }
    ]
}
```
##### GET all coins from an exchange :
```
ENDPOINT: http://34.230.17.205:3010/exchange-info?name=bittrex
OUTPUT:
{
    "status": "OK",
    "info": [
        {
            "coin": "BTC-EUR",
            "value": 4983.7
        },
        {
            "coin": "BTC-CZK",
            "value": 127060
        }, ...
    ]
}
```

### Improvements

  - Instead of using raw `mysql` package, ORM like `sequelize` can be used.
  - use .env files instead file config folder
  - Pagination in the API of coin info and exchange
  - use backpack or gulp to create a build and other tasks
  - Use babel to code in ES6/7
