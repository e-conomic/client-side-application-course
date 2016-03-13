var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');


var _archivedMessages = [];

function deepCopy(messages) {
	return JSON.parse(JSON.stringify(messages));
}

var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_archivedMessages);
	},
	getAllForList: function(listKey) {
		return deepCopy(_archivedMessages.filter(function(msg) { return msg.listKey == listKey }));
	},
	get: function(id) {
		return Object.assign({}, _archivedMessages.find(function(l) { return l.id == id }));
	}
});

store.dispatchToken = Dispatcher.register(function(payload) {
	//Hack in order to avoid the dependency cycle with message-store.js
	//I assume AMD would have solved this
	var MessageStore = require('../stores/message-store');
	switch(payload.type) {
		case Constants.EXTRACT_MESSAGE:
			Dispatcher.waitFor([MessageStore.dispatchToken]);
			var msgToDelete = _archivedMessages.find(function(l) { return l.id == payload.id });
			_archivedMessages.splice(_archivedMessages.indexOf(msgToDelete), 1);
			break;
		case Constants.ARCHIVE_MESSAGE:
			_archivedMessages.push(MessageStore.get(payload.id));
			break;
		default:
			return;
	}

	store.emitChange();
});

module.exports = store;