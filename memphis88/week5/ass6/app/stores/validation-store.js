var BaseStore = require('./base');
var Constants = require('../dispatcher/constants');
var Dispatcher = require('../dispatcher/dispatcher').Dispatcher;

store = Object.assign({}, BaseStore, {
	getAll: function() {},
});

store.dispatchToken = Dispatcher.register(function(payload) {
	switch(payload.type) {
		case Constants.EXCEED_RANGE_ERROR:
			break;
		default:
			return;
	}

	store.emitChange();
});