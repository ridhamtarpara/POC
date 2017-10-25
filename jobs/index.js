const schedule = require('node-schedule');

var job;

function _initializeJob(){
	const rule = new schedule.RecurrenceRule();
	//Todo add a configurable option
	rule.second = 60;
	
	job = schedule.scheduleJob(rule, () => {
		API.fetchLatestData();
	});
}

function _shutdown () {
	console.log('bye.');
	job ? job.cancel() : () => {};
	process.exit();
};

process.on('SIGTERM', _shutdown);
process.on('SIGINT', _shutdown);

_initializeJob();

module.exports = job;