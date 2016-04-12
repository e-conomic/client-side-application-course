var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');
var AjaxHandler = require('../utilities/ajax-handler');

var _messages = [];
var _sortedMessages = [];
var _translatedMessages = [];

function deepCopy(messages) {
	return JSON.parse(JSON.stringify(messages));
}

function createId() {
	return Date.now();
}

function makeAndSortMessageList() {
	_sortedMessages = deepCopy(_messages);
	_sortedMessages.sort(function(a, b) {
		if (a.message > b.message) return 1;
		if (a.message < b.message) return -1;
		return 0;
	});
}


var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_messages);
	},
	getAllSorted: function() {
		makeAndSortMessageList();
		return deepCopy(_sortedMessages);
	},
	getAllForList: function(listKey) {
		return deepCopy(_messages.filter(function(msg) { return msg.listKey == listKey }));
	},
	get: function(id) {
		return Object.assign({}, _messages.find(function(m) { return m.id == id }));
	},
	getTranslatedMessages: function() {
		return deepCopy(_translatedMessages);
	}
});

store.dispatchToken = Dispatcher.register(function(payload) {
	switch(payload.type) {
		case Constants.CREATE_MESSAGE:
			var ListStore = require('./list-store');
			_messages.push({
				id: createId(),
				listKey: payload.listKey,
				message: payload.message,
				isArchived: false,
				color: ListStore.get(payload.listKey).color
			});
			break;
		case Constants.DELETE_MESSAGE:
			var msgToDelete = _messages.find(function(m) { return m.id == payload.id });
			_messages.splice(_messages.indexOf(msgToDelete), 1);
			break;
		case Constants.MOVE_MESSAGE:
			var msgToMove = _messages.find(function(m) { return m.id == payload.id });
			msgToMove.listKey = parseInt(payload.listKey);
			msgToMove.color = payload.color;
			break;
		case Constants.ARCHIVE_MESSAGE:
			var msgToDelete = _messages.find(function(m) { return m.id == payload.id });
			msgToDelete.isArchived = true;
			break;
		case Constants.EXTRACT_MESSAGE:
			var msgToDelete = _messages.find(function(m) { return m.id == payload.id });
			msgToDelete.isArchived = false;
			break;
		case Constants.TRANSLATE_MESSAGES:
			_translatedMessages = payload.translatedMessages;
			break;
		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

