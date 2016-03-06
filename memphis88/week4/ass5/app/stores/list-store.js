var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');

var _list = [];

function deepCopy(list) {
	return JSON.parse(JSON.stringify(list));
}

function createId() {
	return Date.now();
}

var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_list);
	},
	get: function(id) {
		return Object.assign({}, _list.find(function(l) { return l.id == id }));
	}
});

store.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_LIST:
			_list.push({
				index: createId(),
				name: payload.listName,
				messageList: [],
				archivedList: []
			});
			break;

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;