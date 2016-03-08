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
	},

	deleteMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.DELETE_MESSAGE,
			id: msgId
		});
	},

	moveMessage: function(msgId, targetListId) {
		Dispatcher.dispatch({
			type: Constants.MOVE_MESSAGE,
			id: msgId,
			listKey: targetListId
		});
	},

	archiveMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.ARCHIVE_MESSAGE,
			id: msgId
		});
	},

	extractMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.EXTRACT_MESSAGE,
			id: msgId
		});
	}
}