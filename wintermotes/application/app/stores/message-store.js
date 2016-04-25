var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var BaseStore = require('./base');

var notificationBar = require("../components/notification-bar")

function findAllMessagesFromId (id, array, archived){
	var messages = []
	for(var i = 0; i<array.length; i++){
		if(array[i].listId == id && array[i].archived == archived){
			messages.push(array[i])
		}
	}
	return messages
}

function findMessageById (id){
	var index = _messages.findIndex(function(m){return m.messageId == id});
	return index
}

function sortArrayByListIds (array, listIds){
	var messages = []
	var isFiltered = true
	for(var i = 0; i<array.length; i++){
		for(var j = 0; j<listIds.length; j++){
			if(array[i].listId ==listIds[j]){
				isFiltered = false; 
				break; 
			}
		}

		if(isFiltered){
			messages.push(array[i])
		}

		isFiltered = true; 
	}
	return messages
}

function sortArrayAlphabetically (array){
	array.sort(function(msg1, msg2) {
	    var msg1 = msg1.content.toUpperCase();
	    var msg2 = msg2.content.toUpperCase();
	    return (msg1 < msg2) ? -1 : (msg1 > msg2) ? 1 : 0;
	});
	return array
}

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
					listIds : [], 
					alphabetic : true
				},
]

var _notifications = []

var MessageStore = Object.assign({}, BaseStore, {
	getAllMessages: function() {
		return JSON.parse(JSON.stringify(_messages));
	},
	getMessagesFromId: function(id, archived) {
		var messages = findAllMessagesFromId(id, _messages, archived)
		return messages
	},
	getMessagesFromFilters : function (){
		if(_messageFilters[0].listIds.length == 0){
			var messages = JSON.parse(JSON.stringify(_messages))
			messages = sortArrayAlphabetically(messages)
			return messages;
		}

		var messages = sortArrayByListIds(_messages, _messageFilters[0].listIds)
		return messages
	},
	getNotifications : function(){
		return _notifications
	},
	getAllLangugages: function(){
		if(_languages.length == 0)
			return 'Loading languages...'
		return JSON.parse(JSON.stringify(_languages.data));
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
			_messages.splice(findMessageById(payload.messageId), 1)
			break;
		case Constants.ARCHIVE_MESSAGE: 
			_messages[findMessageById(payload.messageId)].archived = true
			break;
		case Constants.UNARCHIVE_MESSAGE: 
			_messages[findMessageById(payload.messageId)].archived = false
			break; 
		case Constants.MOVE_MESSAGE: 
			var index = findMessageById(payload.messageId)
			_messages[index].listId = payload.listId;
			break; 
		case Constants.UPDATE_FILTERS: 
			_messageFilters = payload.filters
			break; 
		case Constants.ADD_FILTER: 
			if(payload.filterType == 'listFilter')
				_messageFilters[0].listIds.push(payload.filter)
			break; 
		case Constants.REMOVE_FILTER: 
			if(payload.filterType == 'listFilter')
				_messageFilters[0].listIds.splice(payload.listId, 1)
			break; 	
		case Constants.DISMISS_NOTIFICATION: 
			_notifications.splice(0, 1) // TODO: Make this find index through id. 
			break;
		case Constants.CREATE_NOTIFICATION: 
			var notification = {
				message : payload.text,
				isError : payload.isError,
				id : _notifications.length + 1
			}
			_notifications.push(notification);
			break; 		
		case Constants.TRANSLATE_MESSAGES:
			if(_originalMessages.length == 0) 
				_originalMessages = MessageStore.getAllMessages(); 
			_messages = payload.messages; 
			break; 
		case Constants.DISABLE_TRANSLATION: 
			_messages = JSON.parse(JSON.stringify(_originalMessages)); 
			break; 
		case Constants.GET_LANGUAGES: 
			_languages = JSON.parse(payload.languages)
			break; 			
		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;

