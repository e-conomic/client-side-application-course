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
			var list = ListStore.get(payload.listKey);
			/*
			 * Should stores communicate with eachother and in what way?
			 * What happens with complex models, how can a store retrieve state from another store and manipulate it?
			 * It feels that react discourages models with deep nested objects; more like 1 store for every top level object
			 * and avoid deep nesting - it is better to create multuple shallow objects and cross-relate those?
			 */
			break;

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

