var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

var _list = [];

var listStore = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_list);
	},
	get: function(id) {
		return Object.assign({}, _list.find(function(l) { return l.id == id }));
	}
});

console.log(Dispatcher)

listStore.dispatchToken = Dispatcher.register(function(payload){
	console.log("Registering dispatcher with paylod: ")
	console.log(payload)
	switch(payload.type) {
		case Constants.CREATE_LIST:
			_list.push({
				id: 125,
				name: payload.listName
			})
			break

		default:
			return;
	}

	store.emitChange();
});