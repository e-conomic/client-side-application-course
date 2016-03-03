var Constants = require('./constants');
var Dispatcher = require('./dispatcher');

module.exports = {

	moveMessage(chosenListID, messageID) { 
		Dispatcher.dispatch({
			type: Constants.MOVE_MESSAGE,
			listID: parseInt(chosenListID),
			messageID: messageID
		});
	},

	deleteMessage(listID, messageID) { 
		Dispatcher.dispatch({
			type: Constants.DELETE_MESSAGE,
			listID: listID,
			messageID: messageID
		});
	},

	archiveMessage(listID, messageID) { 
		Dispatcher.dispatch({
			type: Constants.ARCHIVE_MESSAGE,
			listID: listID,
			messageID: messageID
		});
	},

	createMessage(listID, text) { 
		Dispatcher.dispatch({
			type: Constants.CREATE_MESSAGE,
			listID: listID,
			messageID: Date.now(),
			text: text,
			isArchived: false
		});
	}
}
