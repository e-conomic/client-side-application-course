var Constants = require('../constants/constants');
var BaseStore = require('./base');
var Dispatcher = require('../dispatcher');

var _list = [];

// read
let ListStore = Object.assign({}, BaseStore, {
	getAll: function() {
		return _list;
	},

	getOne: function(id) {
		return Object.assign({}, _list.find(function(l) { return l.id == id }));
	},

	getListProperties() { 
		let listProperties = _list.filter( list => { 
			return { listName: list.listName, listID: list.listID }
		});

		return listProperties;
	}
});

// update
ListStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_LIST:

			_list.push({
				listID: Date.now(),
				listName: payload.listName
			});
			break;

		default:
			return;
	}

	ListStore.emitChange();
});

module.exports = ListStore;
