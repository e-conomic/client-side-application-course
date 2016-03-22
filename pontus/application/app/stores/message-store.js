var Dispatcher = require('../dispatcher');
var Constants = require('../constants/constants');
var BaseStore = require('./base');

var ValidationStore = require('./validation-store');

var _messages = [];
var _errorMessages = [];
var _filteredListIDs = [];
var _filteredMessages = [];

var _translating = false;

var MessageStore = Object.assign({}, BaseStore, {
	getAll() { 
		return _messages;
	},

	get(messageID) {
		return _messages.find( message => message.messageID == messageID);
	},

	getErrorMessage() { 
		return _errorMessages.shift();
	},
	
	getMessagesFilteredByListID() { 
		 return _filteredMessages;
	},

	getFilteredIDs() { 
		return _filteredListIDs;
	},

	getTranslationStatus() { 
		return _translating;
	},
});


MessageStore.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.DELETE_MESSAGE:
			_messages = _messages.filter( message => message.messageID != payload.messageID );

			break;
		case Constants.ARCHIVE_MESSAGE:

			let archivedMessage = _messages.find( message => message.messageID == payload.messageID);
			archivedMessage.isArchived = !archivedMessage.isArchived;
			let restOfmessages = _messages.filter( message => message.messageID != payload.messageID );
			_messages = restOfmessages.concat(archivedMessage);

			break;
		case Constants.MOVE_MESSAGE:
			let message = _messages.find( message => message.messageID == payload.messageID );
			let otherMessages = _messages.filter( message => message.messageID != payload.messageID );
			message.listID = payload.listID;

			_messages = otherMessages.concat(message);


			break;
		case Constants.CREATE_MESSAGE:
			Dispatcher.waitFor([ ValidationStore.dispatchToken]);
			
			let validatedMessage = ValidationStore.get();

			if ( !validatedMessage.isErrorCharacters && !_messages.find( message => message.text == validatedMessage.text) ) { 
				_messages.push({ 
					listID: validatedMessage.listID,
					messageID: Date.now(),
					text: validatedMessage.text,
					isArchived: validatedMessage.isArchived
				});
			} 

			else if (validatedMessage.isErrorCharacters) { 
				_errorMessages.push("Too many characters.");
			}
			else {
				_errorMessages.push("Message is not unique");
			}

			break;
		case Constants.ADD_LISTID_TO_FILTER:

			let index = _filteredListIDs.indexOf(payload.listID);
			if (index == -1)  _filteredListIDs.push(payload.listID); 
			else _filteredListIDs.splice(index, 1); 

			let filteredListIds = _filteredListIDs.join(',');

			_filteredMessages = _messages.filter( message => { 
					let re = new RegExp(message.listID);
					return re.test(filteredListIds); 
			});

		break;
		case Constants.TRANSLATING_MESSAGE:

			// the view should listen to this and have a loading message.
			_translating=true;

		break;

		case Constants.FINISHED_TRANSLATING:

			// stop the loading icon
			_translating = false;

			message = _messages.find( message => message.messageID = payload.messageID);

			message.translatedMessage = payload.translatedMessage;

			let noneTranslatedMessages = _messages.filter( message => message.messageID != payload.messageID );
			_messages = noneTranslatedMessages.concat(message);


		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;
