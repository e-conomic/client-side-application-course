var Constants = require('./constants');
var Dispatcher = require('./dispatcher');

module.exports = {

	validateMessage(text) { 
		Dispatcher.dispatch({
			type: Constants.VALIDATE_MESSAGE,
			text: text
		});
		console.log('validation-action validateMessage');
	}
}
