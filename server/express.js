const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const winstonInstance = require('./winston');
const routes = require('./routes');
const config = require('../config');
const scheduler = require('./schedulers');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.application.env === 'development') {
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
	app.use(expressWinston.logger({
		winstonInstance,
		meta: true,     // optional: log meta data about request (defaults to true)
		msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
		colorStatus: true   // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
	}));
}

// mount all routes on /v1.0 path
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.status(404).json({ status: 'NOTOK', errormessage: 'API not found', errorcode: 404});
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>        // eslint-disable-line no-unused-vars
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		stack: config.env === 'development' ? err.stack : {}
	})
);

module.exports = app;
