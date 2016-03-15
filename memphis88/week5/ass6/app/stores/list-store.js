var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');

var _list = [];

function deepCopy(list) {
	return JSON.parse(JSON.stringify(list));
}

function createId() {
	return Date.now();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_list);
	},
	get: function(id) {
		return Object.assign({}, _list.find(function(l) { return l.id == id }));
	}
});

store.dispatchToken = Dispatcher.register(function(payload) {
	switch(payload.type) {
		case Constants.CREATE_LIST:
			_list.push({
				id: createId(),
				name: payload.listName,
				color: getRandomColor()
			});
			break;

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;