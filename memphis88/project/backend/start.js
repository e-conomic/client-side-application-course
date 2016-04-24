var express = require('express');
var app = express();

var Authenticator = require('./authenticate');
var Calendar = require('./calendar');

app.get('/', function(request, response) {
	Authenticator.authenticate()
		.then(Calendar.getCalendar)
		.then(function(cal) {
			response.json(cal);
		})
		.catch(function(cal) {
			response.json(cal);
		});
});

// app.



app.listen(8080, function() {
	console.log('Backend started and listening on port 8080!');
});
