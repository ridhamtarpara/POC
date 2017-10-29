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
	cronTime: '0 */10 * * * *',
	exchanges: ['coinsecure', 'coinmate', 'flowbtc', 'gatecoin']
};
