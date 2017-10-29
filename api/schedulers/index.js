const schedule = require('node-schedule');
const currencyController = require('../controllers/currency.controller');
const config = require('config');
const logger = require('../helpers/logger');
// start scheduler
const scheduler = schedule.scheduleJob(config.get('cron'), () => {
  try {
    // call controller method to get datafrom web
    currencyController.getDataFromWeb();
  } catch (e) {
    logger.log(e);
  }
});
