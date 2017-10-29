const config = require('./config/env/development');
const app = require('./server/express');

const application = config.application;

// listen on port config.port
app.listen(application.httpPort, () => {
	console.log(`server started on port ${application.httpPort} (${application.env})`);
});

module.exports = app;
