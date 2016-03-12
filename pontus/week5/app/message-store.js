var Dispatcher = require('./dispatcher');
var BaseStore = require('./base');
var Constants = require('./constants');

var ValidationStore = require('./validation-store');

var _messages = [];
var _errorMessages = [];

var _filteredListIDs = [];
var _filteredMessages = [];

var MessageStore = Object.assign({}, BaseStore, {
	getAll() { 
		return _messages;
	},

	get(messageID) {
		return _messages.find( message => message.messageID == messageID);
	},

	// if undefined then set the notification bar green.
	getErrorMessage() { 
		return _errorMessages.shift();
	},
	
	getMessagesFilteredByListID() { 
		console.log('getMessagesFilteredByListID');
		console.log(_filteredMessages);
		 return _filteredMessages;
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
			// make this wait for the validation.
		case Constants.CREATE_MESSAGE:
			Dispatcher.waitFor([ ValidationStore.dispatchToken]);
			
			// gets the first message in the queue.
			let validatedMessage = ValidationStore.get();

			if ( !validatedMessage.isErrorCharacters && !_messages.find( message => message.text == validatedMessage.text) ) { 
				_messages.push({ 
					listID: payload.listID,
					messageID: payload.messageID,
					text: payload.text,
					isArchived: payload.isArchived
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

			console.log('filteredListIDs');
			console.log(_filteredListIDs);

			let filteredIDsRegex = new RegExp(_filteredListIDs.join());
			console.log(filteredIDsRegex);

			_filteredMessages = _messages.filter( message => { 
					console.log(filteredIDsRegex.test(message.listID));
					return filteredIDsRegex.test(message.listID); 
			});

			 // console.log('filtered messages');
			 // console.log(_filteredMessages);
		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;
