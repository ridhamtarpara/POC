const schedule = require('node-schedule');
const currencyController = require('../controllers/currency');
const config = require('../../config');

const scheduler = schedule.scheduleJob(config.cronTime, () => {
	try {
		console.log('cron started');
		currencyController.getDataFromWeb();
	} catch (e) {}
});
