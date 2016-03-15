var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('./constants');
var BaseStore = require('./base');

var _list = [];

ListStore = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_list);
	}
});

Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.CREATE_LIST:
			_list.push({
				id: createId(),
				name: payload.listName
			})
			break

		default:
			return;
	}

	ListStore.emitChange();
});

module.exports = ListStore;

