var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

var _lists = [
				{
					listId : 0, 
					listName : 'StoreList1', 
					visible : true
				},
				{
					listId : 1, 
					listName : 'StoreList2', 
					visible : true
				}
			];

var ListStore = Object.assign({}, BaseStore, {
	getAllLists: function() {
		return JSON.parse(JSON.stringify(_lists));
	},
	getListById: function(id) {
		return Object.assign({}, _lists.find(function(l) { return l.listId == id }));
	}, 
});

ListStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_LIST:
			_lists.push({
				listId: _lists.length,
				listName: payload.listName, 
				visible : true
			})
		break; 
		default:
			return;
	}
	ListStore.emitChange();
});

module.exports = ListStore;