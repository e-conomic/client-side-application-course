var google = require('googleapis');

function getDateOfISOWeek(w, y) {
	var simple = new Date(y, 0, 1 + (w - 1) * 7);
	var dow = simple.getDay();
	var ISOweekStart = simple;
	if (dow <= 4)
		ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	else
		ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	return ISOweekStart;
}

var Events = {

	getAllEventsForWeek: function(auth, calId, week, year) {
		if (!year) year = new Date().getFullYear();
		var start = getDateOfISOWeek(week, year);
		var end = new Date(start);
		end.setDate(end.getDate() + 7);
		return new Promise(function(resolve, reject) {
			var calendar = google.calendar('v3');
			calendar.events.list({
				auth: auth,
				calendarId: calId,
				timeMin: start.toISOString(),
				timeMax: end.toISOString(),
				singleEvents: true,
				orderBy: 'startTime'
			}, function(err, response) {
				if (err) reject(err);
				resolve(response);
			});
		});
	},

	createEvent: function(auth, calId, evtInfo) {
		var evt = {};
		evt.summary = evtInfo.name;
		evt.location = evtInfo.location;
		evt.start.dateTime = evtInfo.start;
		evt.end.dateTime = evtInfo.end;
		evt.attendees = [];
		evt.attendees.push(evtInfo.email);
		evt.attendees.push(evtInfo.phone);
		return new Promise(function(resolve, reject) {
			var calendar = google.calendar('v3');
			calendar.events.insert({
				auth: auth,
				calendarId: calId,
				resource: evt
			}, function(err, response) {

			});
		});
	},

}

module.exports = Events;
