var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');
var MessageStore = require('./message-store');


var _filteredMessages = [];

function deepCopy(messages) {
	return JSON.parse(JSON.stringify(messages));
}

function makeAndSortMessageList() {
	_filteredMessages = MessageStore.getAll();
	_filteredMessages.sort(function(a, b) {
		if (a.message > b.message) return 1;
		if (a.message < b.message) return -1;
		return 0;
	});
}

var store = Object.assign({}, BaseStore, {
	getAll: function() {
		makeAndSortMessageList();
		return deepCopy(_filteredMessages);
	},
	getMessagesFromLists: function(listIds) {

	},
	get: function(listId) {
		// _filteredMessages = gatherMessagesFromList(listId);
		return deepCopy(_filteredMessages);
	}
});

store.dispatchToken = Dispatcher.register(function(payload) {
	switch(payload.type) {
		case Constants.ARCHIVE_MESSAGE:
	}
});

module.exports = store;