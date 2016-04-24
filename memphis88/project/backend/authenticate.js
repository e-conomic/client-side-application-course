var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
	process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs.json';

function authorize(credentials) {
	return new Promise(function(resolve, reject) {
		var clientSecret = credentials.installed.client_secret;
		var clientId = credentials.installed.client_id;
		var redirectUrl = credentials.installed.redirect_uris[0];
		var auth = new googleAuth();
		var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

		fs.readFile(TOKEN_PATH, function(err, token) {
			if (err) {
				getNewToken(oauth2Client).then(resolve);
			} else {
				oauth2Client.credentials = JSON.parse(token);
				resolve(oauth2Client);
			}
		});
	});
}

function getNewToken(oauth2Client) {
	return new Promise(function(resolve, reject) {
		var authUrl = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES
		});
		console.log('Authorize this app by visiting this url: ', authUrl);
		var rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question('Enter the code from that page here: ', function(code) {
			rl.close();
			oauth2Client.getToken(code, function(err, token) {
				if (err) {
					console.log('Error while trying to retrieve access token', err);
					return;
				}
				oauth2Client.credentials = token;
				storeToken(token);
				resolve(oauth2Client);
			});
		});
	});
}

function storeToken(token) {
	try {
		fs.mkdirSync(TOKEN_DIR);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw err;
		}
	}
	fs.writeFile(TOKEN_PATH, JSON.stringify(token));
	console.log('Token stored to ' + TOKEN_PATH);
}

var Authenticator = {
	authenticate: function() {
		return new Promise(function(resolve, reject) {
			fs.readFile('client_secret.json', function processClientSecrets(err, content) {
				if (err) {
					console.log('Error loading client secret file: ' + err);
					return;
				}
				authorize(JSON.parse(content)).then(function(res) {
					resolve(res);
				});
			});
		});
	}
}

module.exports = Authenticator;
