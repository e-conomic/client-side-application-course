var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('../dispatcher/base');

var _messages = [];

var store = Object.assign({}, BaseStore, {
	// TODO
});

store.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {

		default:
			return;
	}

	store.emitChange();
});

module.exports = store;

