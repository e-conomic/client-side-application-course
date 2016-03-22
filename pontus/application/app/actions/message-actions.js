var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher');

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
			isArchived: false,
			translatedMessage: null
		});
	},

	addListIDToFilter(listID) { 
		Dispatcher.dispatch({ 
			type: Constants.ADD_LISTID_TO_FILTER,
			listID: listID
		});
	},

	translateMessagesRequested() { 
		Dispatcher.dispatch({ 
			type: Constants.TRANSLATING_MESSAGE
		});
	},

	translateMessages(userSpecifiedText, userSpecifiedLanguage, googleKey) { 

		let query = "?q="+userSpecifiedText;
		let language = "&target="+userSpecifiedLanguage;
		let key = "key="+googleKey;

		xhr('GET', 'https://www.googleapis.com/language/translate/v2'+query+language+key, null, () => { 
				// on success
				Dispatcher.dispatch({ 
					type: languagesReceived,
					translations: translations
				});
				}, () => { 

				// on failure
				Dispatcher.dispatch({ 
					type: failureOnLanguagesReceived,
				});
				}
		);
	}
}


