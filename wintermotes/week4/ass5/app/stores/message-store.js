var Dispatcher = require('flux').Dispatcher;
var Constants = require('../constants');
var BaseStore = require('./base');

store = Object.assign({}, BaseStore, {
	// TODO
});

store.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {

		default:
			return;
	}

	store.emitChange();
});

return store;

