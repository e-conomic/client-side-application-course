var Dispatcher = require('./dispatcher');
var BaseStore = require('./base');
var Constants = require('./constants');

// var MessageActions = require('./message-actions');
// var MessageStore = require('./message-store');

// var _messages = [];
var _validationQueue = []; 

// store validation of messages in this queue, with messageID and error status. Then listen from
// message-store.

var ValidationStore = Object.assign({}, BaseStore, {
	get() { 
		return _validationQueue.shift();
	}
});

ValidationStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_MESSAGE:

			console.log('VALIDATE_MESSAGE action from validation-store');

			let isErrorCharacters=false;
			if ( payload.text.length >= 200) isErrorCharacters=true; 

			_validationQueue.push( { 
				listID: payload.listID,
				text: payload.text,
				isErrorCharacters:isErrorCharacters 
			});

			break;
		default:
			return;
	}
});

module.exports = ValidationStore;
