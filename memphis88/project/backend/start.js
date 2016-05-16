var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var jwtAuth;

var Authenticator = require('./authenticate');
var Calendar = require('./calendar');
var Events = require('./events');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function(request, response) {
	Calendar.getCalendar(jwtAuth)
		.then(function(cal) {
			response.json(cal);
		})
		.catch(function(err) {
			response.json(err);
		});
});

app.get('/week/:num', function(request, response) {
	var week = request.params.num;
	Calendar.getCalendar(jwtAuth)
		.then(function(cal) {
			return Events.getAllEventsForWeek(jwtAuth, cal.id, week, request.query.year)
		})
		.then(function(evt) {
			response.json(evt);
		})
		.catch(function(err) {
			response.json(err);
		});
});

app.post('/event', function(request, response) {
	var evtInfo = request.body;
	Calendar.getCalendar(jwtAuth)
		.then(function(cal) {
			return Events.createEvent(jwtAuth, cal.id, evtInfo);
		})
		.then(function(evt) {
			response.json(evt);
		})
		.catch(function(err) {
			response.json(err);
		});
});

app.listen(8080, function() {
	Authenticator.authenticate()
		.then(function(auth) {
			jwtAuth = auth;
			console.log('Backend started and listening on port 8080!');
		})
		.catch(console.log);
});
