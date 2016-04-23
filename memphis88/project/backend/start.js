var Authenticator = require('./authenticate');
var Calendar = require('./calendar');


Authenticator.authenticate()
	.then(function(res) {
		Calendar.getCalendars(res)
			.then(function(response) {
				console.log(response);
			});
	});
