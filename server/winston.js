/**
 * Global Winston Logger config
 */
const winston = require('winston');
const path = require('path');
const config = require('../config');
const env = config.application.env;

// All logs goes here
const allLogs = path.join(__dirname, 'logs/sys.log');

// Un-handeled Exception logs goes here
const excLogs = path.join(__dirname, 'logs/exceptions.log');

let logger;

/**
 * Winston Logger
 * Instantiate custom logger.
 */
if (env !== 'development') {
	/**
	 * Winston Logger for Stage and Production
	 */
	logger = new (winston.Logger)({
		transports: [
			new (winston.transports.File)({
				filename: allLogs
			})
		],
		exceptionHandlers: [
			new (winston.transports.File)({
				filename: excLogs
			})
		]
	});
	/* In Stage and Production, don't terminate
	 * application on unhandelled errors.
	 */
	logger.exitOnError = false;
} else {
	/**
	 * Default Winston Logger
	 * This logger will be for Development env
	 */
	logger = new (winston.Logger)({
		transports: [
			// new (winston.transports.Console)({
			// 	json: true,
			// 	colorize: true
			// })
		]
	});
}

module.exports = logger;
