var Dispatcher = require('./dispatcher');
var BaseStore = require('./base');
var Constants = require('./constants');

var ValidationStore = require('./validation-store');

var _messages = [];
var _errorMessages = [];

var MessageStore = Object.assign({}, BaseStore, {
	getAll() { 
		return _messages;
	},

	testing() {
		console.log('testing');
	},

	get(messageID) {
		return _messages.find( message => message.messageID == messageID);
	},

	// if undefined then set the notification bar green.
	getErrorMessage() { 
		return _errorMessages.shift();
	}

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
			console.log(validatedMessage);

			console.log(_messages.find( message => message.text != validatedMessage.text) );

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
		default:
			return;
	}
	MessageStore.emitChange();
});

module.exports = MessageStore;
