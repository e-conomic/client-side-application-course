var Constants = require('./constants');
var Dispatcher = require('./dispatcher');

module.exports = {

	moveMessage(chosenListID, messageID) { 
		Dispatcher.dispatch({
			type: Constants.MOVE_MESSAGE,
			chosenListID: chosenListID,
			messageID: messageID
		});
		console.log('move from action-creater');
	},

	deleteMessage(listID, messageID) { 
		Dispatcher.dispatch({
			type: Constants.DELETE_MESSAGE,
			listID: listID,
			messageID: messageID
		});
		console.log('delete from action-creater');
	},

	archiveMessage(listID, messageID) { 
		Dispatcher.dispatch({
			type: Constants.ARCHIVE_MESSAGE,
			listID: listID,
			messageID: messageID
		});
		console.log('archive from action-creater');
	}
}
