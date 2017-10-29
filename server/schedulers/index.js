const schedule = require('node-schedule');
const currencyController = require('../controllers/currency');
const config = require('../../config');
console.log(config.cronTime);
const scheduler = schedule.scheduleJob(config.cronTime, () => {
	try {
		// console.log('cron started\n\n\n\n\n\n');
		currencyController.getDataFromWeb();
	} catch (e) {
		console.log(e);
	}
});
