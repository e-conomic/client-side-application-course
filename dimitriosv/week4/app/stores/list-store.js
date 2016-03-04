var Dispatcher =  require('../dispatcher/dispatcher.js');
var Constants = require('../constants');
var BaseStore = require('./base');

var _list = [{listId: 1, listName: "first list1"},{listId: 2, listName: "second list2"}];
var _totalElements = 2;


function deepCopy(itemToCopy) {
    var listCopy = JSON.parse(JSON.stringify(itemToCopy));
    return listCopy;
}

// reads
var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_list);
	},
    getTotalElements: function() {
        return _totalElements;
    },
	get: function(id) {
		return Object.assign({}, _list.find(function(l) { return l.id == id }));
	}
});

//updates
store.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.CREATE_LIST:
            _totalElements++;
			_list.push({
				 listId: _totalElements,
				 listName: payload.listName
			})
			break

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

