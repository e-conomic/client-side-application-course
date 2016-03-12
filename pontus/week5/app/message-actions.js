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

	deleteMessage(messageID) { 
		Dispatcher.dispatch({
			type: Constants.DELETE_MESSAGE,
			messageID: messageID
		});
	},

	archiveMessage(messageID) { 
		Dispatcher.dispatch({
			type: Constants.ARCHIVE_MESSAGE,
			messageID: messageID
		});
	},

	createMessage(listID, text) { 
		Dispatcher.dispatch({
			type: Constants.CREATE_MESSAGE,
			listID: listID,
			text: text,
			isArchived: false
		});
	},

	addListIDToFilter(listID) { 
		console.log('sending acton addListIDToFilter');
		Dispatcher.dispatch({ 
			type: Constants.ADD_LISTID_TO_FILTER,
			listID: listID
		});
	}




}
