let Constants = require('../constants/constants');
let Dispatcher = require('../dispatcher');

let xhr = require('../script');

let googleKey = require('../translate-url');

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

	createMessage(listID, text, allMessages) { 

		if (allMessages.find(message => message.text == text)) { 
			Dispatcher.dispatch({
				type: Constants.FAILURE_ON_CREATE_MESSAGE_NOT_UNIQUE
			});

		}
		else if ( text.length >= 200) { 
			Dispatcher.dispatch({
				type: Constants.FAILURE_ON_CREATE_MESSAGE_TOO_MANY_MANY_CHARS
			});
		}

		else { Dispatcher.dispatch({
				type: Constants.CREATE_MESSAGE,
				listID: listID,
				text: text,
				isArchived: false,
				translatedMessage: null
			});
		}
	},

	addListIDToFilter(listID) { 
		Dispatcher.dispatch({ 
			type: Constants.ADD_LISTID_TO_FILTER,
			listID: listID
		});
	},

	cancelMessageTranslation() { 
		Dispatcher.dispatch({ 
			type: Constants.CANCEL_TRANSLATION
		});
	},

	translateMessagesRequested() { 
		Dispatcher.dispatch({ 
			type: Constants.TRANSLATING_MESSAGE
		});
	},

	// translate all
	translateMessages(messages, userSpecifiedLanguage) { 

		let language = "?target="+userSpecifiedLanguage;
		let key = "&key="+googleKey;

		let messagesText = messages.map( message => "&q="+message.text );
		let messageStr = messagesText.join('');

		xhr('https://www.googleapis.com/language/translate/v2'+language+messageStr+key, 
			translations => { 
				Dispatcher.dispatch({ 
					type: Constants.LANGUAGES_RECEIVED,
					translations: translations
				});
			}, 
			
			() => { 
				Dispatcher.dispatch({ 
					type: Constants.FAILURE_ON_LANGUAGES_RECEIVED
				});
			}
		);
	}
}


