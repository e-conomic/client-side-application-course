var google = require('googleapis');

function createAppCalendar(auth) {
	return new Promise(function(resolve, reject) {
		var res = { summary: "Appointment Application" };
		var calendar = google.calendar('v3');
		calendar.calendars.insert({
			auth: auth,
			resource: res
		}, function(err, response) {
			if (err) reject(err)
			resolve(response);
		});
	});
}

var Calendar = {

	getCalendar: function(auth) {
		return new Promise(function(resolve, reject) {
			var calendar = google.calendar('v3');
			calendar.calendarList.list({
				auth: auth
			}, function(err, response) {
				if (err) console.log(err);
				var cal = response.items.find(function(c) {
					return c.summary == "Appointment Application"
				});
				if (cal) {
					resolve(cal);
				} else {
					createAppCalendar(auth)
						.then(resolve)
						.catch(reject);
				}
			});
		});
	},

	getTenUpcomingEvents: function(auth) {
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
