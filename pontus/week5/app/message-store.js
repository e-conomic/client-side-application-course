var Constants = require('./constants');
var BaseStore = require('./base');
var Dispatcher = require('./dispatcher');

var _messages = [ ];
// 	{messageID: Date.now(), text: 'message 1'},
// 	{messageID: 1515, text: 'message 2'},
// ];

let messageStore = Object.assign({}, BaseStore, {
	getAll() { 
		return _messages;
	},

	getOne(messageID) {
		return _messages.find( message => message.messageID == messageID);
	},
});

messageStore.dispatchToken = Dispatcher.register(function(payload){

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

			_messages.push({ 
				listID: payload.listID,
				messageID: payload.messageID,
				text: payload.text,
				isArchived: payload.isArchived
			});

			break;
		default:
			return;
	}

	messageStore.emitChange();
});

module.exports = messageStore;
