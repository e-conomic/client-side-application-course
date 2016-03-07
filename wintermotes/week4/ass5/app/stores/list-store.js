var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

var _lists = [
				{
					listId : 0, 
					listName : 'StoreList1', 
				},
				{
					listId : 1, 
					listName : 'StoreList2', 
				}
			];

var ListStore = Object.assign({}, BaseStore, {
	getAll: function() {
		return JSON.parse(JSON.stringify(_lists));
	},
	get: function(id) {
		return Object.assign({}, _lists.find(function(l) { return l.id == id }));
	}
});

console.log("list-store here: ")
console.log(Dispatcher)

ListStore.dispatchToken = Dispatcher.register(function(payload){
	console.log("Registering dispatcher with paylod: ")
	console.log(payload)
	switch(payload.type) {
		case Constants.CREATE_LIST:
			_lists.push({
				listId: _lists.length + 1,
				listName: payload.listName
			})
			console.log("Lists is now: ")
			console.log(_lists)
			ListStore.emitChange()
			break

		default:
			return;
	}

	ListStore.emitChange();
});

module.exports = ListStore;