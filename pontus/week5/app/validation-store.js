var Dispatcher = require('./dispatcher');
var BaseStore = require('./base');
var Constants = require('./constants');

var _validationQueue = []; 

var ValidationStore = Object.assign({}, BaseStore, {
	get() { 
		return _validationQueue.shift();
	}
});

ValidationStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_MESSAGE:

			let isErrorCharacters=false;
			if ( payload.text.length >= 200) isErrorCharacters=true; 

			_validationQueue.push( { 
				listID: payload.listID,
				text: payload.text,
				isErrorCharacters:isErrorCharacters,
				isArchived: payload.isArchived
			});

			break;
		default:
			return;
	}
});

module.exports = ValidationStore;
