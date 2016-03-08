var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

//TODO: Create messages of all kinds of messages and do filtering
var _messages = [
				{
					messageId : 0, 
					listId : 0,
					messageContent : 'Message1, list1', 
					archived : false 
				},
				{
					messageId : 1, 
					listId : 0, 
					messageContent : 'Message2, list1', 
					archived : false
				}, 
				{
					messageId : 2, 
					listId : 1,
					messageContent : 'Message2, list2', 
					archived : false 
				}, 
				{
					messageId : 3, 
					listId : 1,
					messageContent : 'Archived Message2, list2', 
					archived : true 
				}
			];


var MessageStore = Object.assign({}, BaseStore, {
	getAllMessages: function() {
		return JSON.parse(JSON.stringify(_messages));
	},
	getMessagesFromId: function(id, archived) {
		var messages = this.findAllMessagesFromId(id, _messages, archived)
		return messages
	},
	findAllMessagesFromId : function(id, array, archived){
		var messages = []
		for(var i = 0; i<array.length; i++){
			if(array[i].listId == id && array[i].archived == archived){
				messages.push(array[i])
			}
		}
		return messages
	}
});

console.log("message-store here: ")

MessageStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_MESSAGE:
			_messages.push({
				messageId: _lists.length + 1,
				listId: payload.listId,
				messageContent: payload.messageName
			})
			ListStore.emitChange()
			break;
		case Constants.DELETE_MESSAGE:
			_messages.splice(payload.messageId, 1)
			ListStore.emitChange()
			break;
		default:
			return;
	}

	store.emitChange();
});

module.exports = MessageStore;

