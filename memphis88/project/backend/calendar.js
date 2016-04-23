var google = require('googleapis');
var fs = require('fs');

var Calendar = {

	getCalendars: function(auth) {
		return new Promise(function(resolve, reject) {
			var calendar = google.calendar('v3');
			calendar.calendarList.list({
				auth: auth
			}, function(err, response) {
				if (err) throw err;
				resolve(response);
			});
		});
	},

	getTenNearestEvents: function(auth) {
		var calendar = google.calendar('v3');
		calendar.events.list({
			auth: auth,
			calendarId: 'primary',
			timeMin: (new Date()).toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: 'startTime'
		}, function(err, response) {
			if (err) {
				console.log('The API returned an error: ' + err);
				return;
			}
			var events = response.items;
			if (events.length == 0) {
				console.log('No upcoming events found.');
			} else {
				console.log('Upcoming 10 events:');
				for (var i = 0; i < events.length; i++) {
					var event = events[i];
					var start = event.start.dateTime || event.start.date;
					console.log('%s - %s', start, event.summary);
				}
			}
		});
	}
}

module.exports = Calendar;
