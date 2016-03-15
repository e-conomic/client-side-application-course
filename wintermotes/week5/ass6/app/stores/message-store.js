var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

var notificationBar = require("../components/notification-bar")

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

var _messageFilters = [
	{
		listIds : [0, 1], 
		alphabetic : true
	}, 
	{
		messageLength : 200		
	} 
]

var _notifications = []

var ValidationObject = Object.assign({}, BaseStore, {
	validateString : function(string){
		console.log("Recieved string: " + string)
		if(string.length > _messageFilters[1].messageLength){
			var notification = {
				message : "Message cannot be more than " + _messageFilters[1].messageLength + " long.", 
				isError : true, 
				id : _notifications.length + 1
			}
			_notifications.push(notification)
			return false

		}

		if(!this.validateMessageContent(string)){
			var notification = {
				message : "Message content has to be unique.", 
				isError : true, 
				id : _notifications.length + 1
			}
			_notifications.push(notification)
			return false
		}
		return true
	},
	validateMessageContent : function(string){
		for(var i = 0; i<_messages.length; i++){
			if(_messages[i].content == string)
				return false
		}
		return true
	}

})

var MessageStore = Object.assign({}, BaseStore, {
	getAllMessages: function() {
		return JSON.parse(JSON.stringify(_messages));
	},
	getMessagesFromId: function(id, archived) {
		var messages = this.findAllMessagesFromId(id, _messages, archived)
		return messages
	},
	getMessagesFromFilters : function (){
		console.log("Getting message from filters")
		if(_messageFilters[0].listIds.length == 0){
			console.log("Returning ALL messages");
			var messages = JSON.parse(JSON.stringify(_messages))
			messages = this.sortArrayAlphabetically(messages)
			return messages;
		}

		var messages = this.sortArrayByListIds(_messages, _messageFilters[0].listIds)
		if(_messageFilters[0].alphabetic == true)
			
		return messages
	},
	getNotifications : function(){
		return _notifications
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
	}, 
	sortArrayByListIds : function(array, listIds){
		//TODO: Needs to be rewritten
		var messages = []
		for(var i = 0; i<array.length; i++){
			for(var j = 0; j<_messageFilters[0].listIds.length; j++){
				if(array[i].listId != _messageFilters[0].listIds[j]){
					messages.push(array[i])
				}
			}
		}
		return messages
	},
	sortArrayAlphabetically : function(array){
		array.sort(function(msg1, msg2) {
		    var msg1 = msg1.content.toUpperCase();
		    var msg2 = msg2.content.toUpperCase();
		    return (msg1 < msg2) ? -1 : (msg1 > msg2) ? 1 : 0;
		});
		return array
	}
});

MessageStore.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
		case Constants.CREATE_MESSAGE:
			if(ValidationObject.validateString(payload.content)){
				_messages.push({
					messageId : _messages.length + 1,
					listId : payload.listId,
					content : payload.content,
					archived : false 
				});
				var notification = {
					message : "Message created", 
					isError : false, 
					id : _notifications.length + 1
				}
				_notifications.push(notification)
			} 
			break;
		case Constants.DELETE_MESSAGE:
			console.log("DELETE CALLED");
			_messages.splice(MessageStore.findMessageById(payload.messageId), 1)
			break;
		case Constants.ARCHIVE_MESSAGE: 
			console.log("ARCHIVE CALLED")
			_messages[MessageStore.findMessageById(payload.messageId)].archived = true
			break;
		case Constants.UNARCHIVE_MESSAGE: 
			_messages[MessageStore.findMessageById(payload.messageId)].archived = false
			break; 
		case Constants.MOVE_MESSAGE: 
			var index = MessageStore.findMessageById(payload.messageId)
			_messages[index].listId = payload.listId;
			break; 
		case Constants.UPDATE_FILTERS: 
			_messageFilters = payload.filters
			break; 
		case Constants.ADD_FILTER: 
			console.log("Adding filter: " + payload.filter)
			if(payload.filterType = 'listFilter')
				_messageFilters[0].listIds.push(parseInt(payload.filter))
			break; 
		case Constants.REMOVE_FILTER: 
			if(payload.filterType = 'listFilter')
				_messageFilters[0].listIds.splice(payload.listId, 1)
			break; 	
		case Constants.DISMISS_NOTIFICATION: 
			_notifications.splice(0, 1) // TODO: Make this find index through id. 
			break; 					
		default:
			return;
	}

	console.log("EMTTING CHANGE")
	console.log(_messageFilters);
	MessageStore.emitChange();
});

module.exports = MessageStore;

