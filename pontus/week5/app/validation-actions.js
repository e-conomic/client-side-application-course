var Constants = require('./constants');
var Dispatcher = require('./dispatcher');

module.exports = {

	validateMessage(listID, text) { 
		Dispatcher.dispatch({
			type: Constants.VALIDATE_MESSAGE,
			listID: listID,
			text: text
		});
	},
	createMessage(listID, text) { 
		Dispatcher.dispatch({
			type: Constants.CREATE_MESSAGE,
			listID: listID,
			text: text
		});
	}
}

