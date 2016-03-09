var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

var _messages = [
				{
					messageId : 0, 
					listId : 0,
					content : 'Message1, list1', 
					archived : false 
				},
				{
					messageId : 1, 
					listId : 0, 
					content : 'Message2, list1', 
					archived : false
				}, 
				{
					messageId : 2, 
					listId : 1,
					content : 'Message2, list2', 
					archived : false 
				}, 
				{
					messageId : 3, 
					listId : 1,
					content : 'Archived Message2, list2', 
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
	},
	findMessageById : function(id){
		var index = _messages.findIndex(function(m){return m.messageId == id});
		return index
	}
});

MessageStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_MESSAGE:
			_messages.push({
				messageId : _messages.length + 1,
				listId : payload.listId,
				content : payload.content,
				archived : false 
			});
			break;
		case Constants.DELETE_MESSAGE:
			_messages.splice(MessageStore.findMessageById(payload.messageId), 1)
			break;
		case Constants.ARCHIVE_MESSAGE: 
			_messages[MessageStore.findMessageById(payload.messageId)].archived = true
			break;
		case Constants.UNARCHIVE_MESSAGE: 
			_messages[MessageStore.findMessageById(payload.messageId)].archived = false
			break; 
		case Constants.MOVE_MESSAGE: 
			console.log(payload)
			var index = MessageStore.findMessageById(payload.messageId)
			_messages[index].listId = payload.listId;
			break; 
		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;

