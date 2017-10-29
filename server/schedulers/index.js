const schedule = require('node-schedule');
const currencyController = require('../controllers/currency');
const config = require('../../config');

// start scheduler
const scheduler = schedule.scheduleJob(config.cronTime, () => {
	try {
		// call controller method to get datafrom web
		currencyController.getDataFromWeb();
	} catch (e) {
		console.log(e);
	}
});
