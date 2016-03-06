var Constants = require('../dispatcher/constants');
var Dispatcher = require('../dispatcher/dispatcher');

function isValidMessage(msg) {
	if (msg.length <= 200) {
		return true;
	}
	return false;
}

module.exports = {
	createMessage: function(listKey, msgText) {
		if (isValidMessage(msgText)) {
			Dispatcher.dispatch({
				type: Constants.CREATE_MESSAGE,
				listKey: listKey,
				message: msgText
			});
		}
	}
}