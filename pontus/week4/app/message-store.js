// var Dispatcher = require('flux').Dispatcher;
var Constants = require('./constants');
var BaseStore = require('./base');
var Dispatcher = require('./dispatcher');

var _messages = [];

let messageStore = Object.assign({}, BaseStore, {
	getAll() { 
		return (_messages);
	},

	getOne(messageID) {
		return _messages.find( message => message.messageID == messageID);
	}
});

messageStore.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.DELETE_MESSAGE:
			console.log('delete from messageStore');
			break;
		case Constants.ARCHIVE_MESSAGE:
			console.log('archive from messageStore');
			break;
		case Constants.MOVE_MESSAGE:
			console.log('move from messageStore');
			break;
		default:
			return;
	}

	messageStore.emitChange();
});

module.exports = messageStore;
