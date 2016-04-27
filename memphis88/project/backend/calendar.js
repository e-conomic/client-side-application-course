var google = require('googleapis');

function createAppCalendar(auth) {
	return new Promise(function(resolve, reject) {
		var res = {
			summary: "Appointment Application"
		};
		var calendar = google.calendar('v3');
		calendar.calendars.insert({
			auth: auth,
			resource: res
		}, function(err, response) {
			err? reject(err) : resolve(response);
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
				if (err) {
					reject(err);
					return;
				}
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

	addOwnership: function(auth, calId, email) {
		return new Promise(function(resolve, reject) {
			var res = {
				role: "owner",
				scope: {
					type: "user",
					value: email
				}
			};
			var calendar = google.calendar('v3');
			calendar.acl.insert({
				auth: auth,
				calendarId: calId,
				resource: res
			}, function(err, response) {
				err? reject(err) : resolve(response);
			});
		});
	}
}

module.exports = Calendar;
