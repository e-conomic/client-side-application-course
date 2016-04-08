var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');
var AjaxHandler = require('../utilities/ajax-handler');
var Url = require('../../translate-url');

var _messages = [];
var _sortedMessages = [];

function deepCopy(messages) {
	return JSON.parse(JSON.stringify(messages));
}

function createId() {
	return Date.now();
}

function makeAndSortMessageList(messages) {
	_sortedMessages = deepCopy(messages);
	_sortedMessages.sort(function(a, b) {
		if (a.message > b.message) return 1;
		if (a.message < b.message) return -1;
		return 0;
	});
	return _sortedMessages;
}


var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_messages);
	},
	getAllSorted: function() {
		return deepCopy(_sortedMessages);
	},
	getAllForList: function(listKey) {
		return deepCopy(_messages.filter(function(msg) { return msg.listKey == listKey }));
	},
	get: function(id) {
		return Object.assign({}, _messages.find(function(m) { return m.id == id }));
	},
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
			_sortedMessages = makeAndSortMessageList(_messages);
			break;
		case Constants.DELETE_MESSAGE:
			var msgToDelete = _messages.find(function(m) { return m.id == payload.id });
			_messages.splice(_messages.indexOf(msgToDelete), 1);
			_sortedMessages = makeAndSortMessageList(_messages);
			break;
		case Constants.MOVE_MESSAGE:
			var msgToMove = _messages.find(function(m) { return m.id == payload.id });
			msgToMove.listKey = parseInt(payload.listKey);
			msgToMove.color = payload.color;
			_sortedMessages = makeAndSortMessageList(_messages);
			break;
		case Constants.ARCHIVE_MESSAGE:
			var msgToDelete = _messages.find(function(m) { return m.id == payload.id });
			msgToDelete.isArchived = true;
			_sortedMessages = makeAndSortMessageList(_messages);
			break;
		case Constants.EXTRACT_MESSAGE:
			var msgToDelete = _messages.find(function(m) { return m.id == payload.id });
			msgToDelete.isArchived = false;
			_sortedMessages = makeAndSortMessageList(_messages);
			break;
		case Constants.TRANSLATE_MESSAGES:
			if (payload.language == "none") {
				_sortedMessages = makeAndSortMessageList(_messages);
				return;
			}
			var query = "";
			for (var i = 0; i < _sortedMessages.length; i++) {
				query += '&q=' + _sortedMessages[i].message;
			};
			query += '&target='+ payload.language;
			var request = Url + query;
			AjaxHandler.get(request).then(function(response) {
				var data = JSON.parse(response).data;
				for (var i = 0; i < _sortedMessages.length; i++) {
					_sortedMessages[i].message = data.translations[i].translatedText;
				};
				store.emitChange();
				return;
			}, function(error) {
				console.log(error);
				return;
			});
			break;
		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

