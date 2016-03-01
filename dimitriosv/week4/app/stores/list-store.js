var Dispatcher = require('flux').Dispatcher;
var Constants = require('../constants');
var BaseStore = require('./base');

var _list = [];


// reads
store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_list);
	},
	get: function(id) {
		return Object.assign({}, _list.find(function(l) { return l.id == id }));
	}
});

//updates
store.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.CREATE_LIST:
			_list.push({
				//id: createId(),
				//name: payload.listName
			})
			break

		default:
			return;
	}

	store.emitChange();
});

return store;

