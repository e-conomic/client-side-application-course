var Constants = require('./constants');
var BaseStore = require('./base');
var Dispatcher = require('./dispatcher');

var _list = [];

// read
let listStore = Object.assign({}, BaseStore, {
	getAll: function() {
		return _list;
	},

	get: function(id) {
		return Object.assign({}, _list.find(function(l) { return l.id == id }));
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

});

// update
listStore.dispatchToken = Dispatcher.register(function(payload){
	console.log(payload);

	switch(payload.type) {
		case Constants.CREATE_LIST:

			_list.push({
				listID: Date.now(),
				listName: payload.listName
			});

			console.log('create list from listStore');
			console.log(_list);
			break;

		default:
			console.log('default');
			return;
	}

	listStore.emitChange();
});

module.exports = listStore;
