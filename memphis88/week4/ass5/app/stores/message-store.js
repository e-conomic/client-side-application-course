var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');
var ListStore = require('./list-store');

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
	get: function(id) {
		return Object.assign({}, _messages.find(function(l) { return l.id == id }));
	}
});

store.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.CREATE_MESSAGE:
			list = ListStore.get(payload.listKey);
			
			break;

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

