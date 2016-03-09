var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

//TODO: Create messages of all kinds of messages and do filtering
var _messages = [
				{
					messageId : 0, 
					listId : 0,
					messageContent : 'Message1, list1', 
				},
				{
					messageId : 1, 
					listId : 0, 
					messageContent : 'Message2, list1', 
				}, 
				{
					messageId : 2, 
					listId : 1,
					messageContent : 'Message2, list2', 
				}
			];

var _archivedMessages = [
	{
		messageId : 0, 
		listId : 0,
		messageContent : 'Archived msg1, list1', 
	}, 
	{
		messageId : 0, 
		listId : 0,
		messageContent : 'Archived msg2 list1', 
	}
]

var MessageStore = Object.assign({}, BaseStore, {
	getAll: function() {
		return JSON.parse(JSON.stringify(_messages));
	},
	getMessagesFromId: function(id) {
		var messages = this.findMessagesFromId(id, _messages)
		return messages
	},
	getAllArchivedMessages : function() {
		return JSON.parse(JSON.stringify(_archivedMessages));
	},
	getArchivedMessagesFromId : function(id) {
		var messages = this.findMessagesFromId(id, _archivedMessages)
		return messages
	},
	// Should be moved into baseclass?
	findMessagesFromId : function(id, array){
		var messages = []
		for(var i = 0; i<array.length; i++){
			if(array[i].listId == id){
				messages.push(array[i])
			}
		}
		return messages
	},
	findMessageById: function(id){
		return Object.assign({}, _messages.find(function(message) { return message.messageId == id }));
	},
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

