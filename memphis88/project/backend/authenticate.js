var google = require('googleapis');

var key = require('../service_account.json');
var SCOPES = ['https://www.googleapis.com/auth/calendar'];

var Authenticator = {
	authenticate: function() {
		return new Promise(function(resolve, reject) {
			var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, [SCOPES], null);
			jwtClient.authorize(function(err, tokens) {
				if (err) {
					reject(err);
				} else {
					resolve(jwtClient);
				}
			});
		});
	}
}

module.exports = Authenticator;
