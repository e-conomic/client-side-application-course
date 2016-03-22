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

	// translate all
	translateMessages(messages, userSpecifiedLanguage) { 

		let language = "&target="+userSpecifiedLanguage;
		let key = "&key="+googleKey;

		messages.forEach( message => { 

			let query = "?q="+message.text;

			xhr('GET', 'https://www.googleapis.com/language/translate/v2'+query+language+key, null, (translations) => { 

				// let translation = 
				
				for (let obj in translations) { 

					console.log(obj);
				}

				// translations.map( translation => { 
            //
				// 	return translation.translatedText;
				// });

				

				console.log(`translation is: ${translation}`);

				// on success
				Dispatcher.dispatch({ 
					type: Constants.LANGUAGES_RECEIVED,
					translation: translation,
					messageID: message.messageID
				});
				}, 
				
				// on failure
				() => { 
				Dispatcher.dispatch({ 
					type: Constants.FAILURE_ON_LANGUAGES_RECEIVED
				});
				}
			);
		});
	}
}


