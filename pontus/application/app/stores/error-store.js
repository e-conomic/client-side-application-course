var Dispatcher = require('../dispatcher');
var Constants = require('../constants/constants');
var BaseStore = require('./base');

var _errorMessages = []; 

var ErrorStore = Object.assign({}, BaseStore, {
	get() { 
		return _errorMessages.shift();
	}
});

ErrorStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {

		case Constants.FAILURE_ON_CREATE_MESSAGE_TOO_MANY_MANY_CHARS:

			_errorMessages.push("Too Many Characters");

			break;
		case Constants.FAILURE_ON_CREATE_MESSAGE_NOT_UNIQUE:

			_errorMessages.push("Message is not unique");

			break;
		case Constants.FAILURE_ON_LANGUAGES_RECEIVED:

			_errorMessages.push("Could not get translation, try again");

			break;
		default:
			return;

	}

	ErrorStore.emitChange();
});

module.exports = ErrorStore;
