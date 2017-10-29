module.exports = {
	application: {
		env: 'development',
		hostName: 'localhost',
		httpPort: 3010,
	},
	db: {
		host: 'localhost',
		username: 'root',
		password: 'welcome',
		database: 'poc',
		port: 3306
	},
	cronTime: '*/10 * * * *',
	exchanges: ['bittrex', 'poloniex', 'coinsecure', 'coinmate', 'flowbtc', 'gatecoin']
};
