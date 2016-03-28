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
	findIndexWithId : function(id){
		var index = _lists.findIndex(function(l){return l.listId == id});
		return index
	}
});

ListStore.dispatchToken = Dispatcher.register(function(payload){
	console.log("Registering dispatcher with paylod: ")
	switch(payload.type) {
		case Constants.CREATE_LIST:
			_lists.push({
				listId: _lists.length + 1,
				listName: payload.listName, 
				visible : true
			})
		break; 
		case Constants.UPDATE_FILTER:
			var index = ListStore.findIndexWithId(payload.listId)
			_lists[index].visible = payload.visible
		break; 
		default:
			return;
	}
	console.log(_lists)
	ListStore.emitChange();
});

module.exports = ListStore;