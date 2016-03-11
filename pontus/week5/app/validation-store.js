var Constants = require('./constants');
var BaseStore = require('./base');
var Dispatcher = require('./dispatcher');

// let MessageStore = require('./message-store');

var _messages = [];

// store validation of messages in this queue, with messageID and error status. Then listen from
// message-store.
// let _validationQueue = []; 


let validationStore = Object.assign({}, BaseStore, {});


validationStore.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
		case Constants.VALIDATE_MESSAGE:

			console.log(payload.text.length);

			// check that I have access to the message-store.
			// let _messages = MessageStore.getAll();

			console.log(_messages);

			// console.log(_messages.find(message => message.text == payload.text));

			// let isErrorCharacters;
			// let isErrorUnique;


			// if ( payload.text.length <= 200  ) {
			// 	isErrorCharacters:true;
			// }
			// 		
			// if ( _messages.find(payload.text) )  {
			// 	isErrorUnique: true;
			// }


			// _validationQueue.push( { payload.text, isErrorUnique, isErrorCharacters } );

			// console.log(_validationQueue);


			break;
		default:
			return;
	}

	validationStore.emitChange();
});

module.exports = validationStore;
