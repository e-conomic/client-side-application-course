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
	get: function(id) {
		return Object.assign({}, _archivedMessages.find(function(l) { return l.id == id }));
	}
});

store.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.EXTRACT_MESSAGE:
			
			break;
		case Constants.ARCHIVE_MESSAGE:
			var MessageStore = require('../stores/message-store');
			_archivedMessages.push(MessageStore.get(payload.id));
			break;
		default:
			return;
	}

	store.emitChange();
});

module.exports = store;