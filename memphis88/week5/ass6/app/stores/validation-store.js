var BaseStore = require('./base');
var Constants = require('../dispatcher/constants');
var Dispatcher = require('../dispatcher/dispatcher').Dispatcher;

var _valid = false;

store = Object.assign({}, BaseStore, {
	getStatus: function() {
		return _valid;
	},
});

store.dispatchToken = Dispatcher.register(function(payload) {
	switch(payload.type) {
		case Constants.EXCEED_RANGE_ERROR:
			_valid = false;
			break;
		case Constants.CREATE_MESSAGE:
			_valid = true;
			break;
		default:
			return;
	}

	store.emitChange();
});