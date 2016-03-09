var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');
var ArchiveMessageStore = require('../stores/archive-message-store');

var _messages = [];

function deepCopy(messages) {
	return JSON.parse(JSON.stringify(messages));
}

function createId() {
	return Date.now();
}


var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_messages);
	},
	getAllForList: function(listKey) {
		return deepCopy(_messages.filter(function(msg) { return msg.listKey == listKey }));
	},
	get: function(id) {
		return Object.assign({}, _messages.find(function(l) { return l.id == id }));
	}
});

store.dispatchToken = Dispatcher.register(function(payload) {

	switch(payload.type) {
		case Constants.CREATE_MESSAGE:
			_messages.push({
				id: createId(),
				listKey: payload.listKey,
				message: payload.message
			});
			break;
		case Constants.DELETE_MESSAGE:
			var msgToDelete = _messages.find(function(l) { return l.id == payload.id });
			_messages.splice(_messages.indexOf(msgToDelete), 1);
			break;
		case Constants.MOVE_MESSAGE:
			var msgToMove = _messages.find(function(l) { return l.id == payload.id });
			msgToMove.listKey = payload.listKey;
			break;
		case Constants.ARCHIVE_MESSAGE:
			Dispatcher.waitFor([ArchiveMessageStore.dispatchToken]);
			var msgToDelete = _messages.find(function(l) { return l.id == payload.id });
			_messages.splice(_messages.indexOf(msgToDelete), 1);
			break;
		case Constants.EXTRACT_MESSAGE:
			_messages.push(ArchiveMessageStore.get(payload.id));
			break;

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

