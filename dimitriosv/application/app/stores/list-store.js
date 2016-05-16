var Dispatcher =  require('../dispatcher/dispatcher.js');
var Constants = require('../constants');
var BaseStore = require('./base');

var _list = [{listId: 0, listName: "first list1"},{listId: 1, listName: "second list2"}];

function deepCopy(itemToCopy) {
    var listCopy = JSON.parse(JSON.stringify(itemToCopy));
    return listCopy;
}

// reads
var store = Object.assign({}, BaseStore, {
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
            var sizeOfList=_list.length;
			_list.push({
				 listId: sizeOfList++,
				 listName: payload.listName
			})
			break

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

