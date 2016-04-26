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

	getAllEventsForWeek: function(auth, calId, week) {
		return new Promise(function(resolve, reject) {
			var calendar = google.calendar('v3');
			calendar.events.list({
				auth: auth,
				calendarId: calId,
				timeMin: (getDateOfISOWeek(week, new Date().getFullYear()).toISOString(),
				singleEvents: true,
				orderBy: 'startTime'
			}, function(err, response) {});
		});
	}

}

module.exports = Events;
