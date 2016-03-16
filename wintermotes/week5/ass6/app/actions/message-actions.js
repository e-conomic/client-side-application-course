var Constants = require('../constants')
var Dispatcher = require('../dispatcher')

var errorMessage = "An error has happened"

function validateString (string, messages){
	if(string.length >= 200){
		errorMessage = "Messages cant be longer than 200 characters."
		return false
	}

	for(var i = 0; i<messages.length; i++){
		if(messages[i].content == string){
			errorMessage = "Message must be unique."
			return false
		}
	}

	return true
}

module.exports = {
	createMessage : function(content, listId, messages){
		if(validateString(content, messages)){
			Dispatcher.dispatch({
				type : Constants.CREATE_MESSAGE, 
				listId : listId, 
				content : content
			});			
		} else {
			this.createNotification(true)
		}
	},
	moveMessage : function(newListId, messageId){
		Dispatcher.dispatch({
			type : Constants.MOVE_MESSAGE, 
			listId : newListId,
			messageId : messageId,
		});
	},
	deleteMessage : function(id){
		Dispatcher.dispatch({
			type : Constants.DELETE_MESSAGE, 
			messageId : id
		});
	}, 
	archiveMessage : function(id){
		Dispatcher.dispatch({
			type : Constants.ARCHIVE_MESSAGE, 
			messageId : id
		});
	}, 
	unarchiveMessage : function(id){
		Dispatcher.dispatch({
			type : Constants.UNARCHIVE_MESSAGE, 
			messageId : id
		});
	}, 
	updateFilters : function(filters){
		Dispatcher.dispatch({
			type : Constants.UPDATE_FILTERS, 
			filters : filters
		});
	}, 
	addListFilter : function(filter){
		Dispatcher.dispatch({
			type : Constants.ADD_FILTER, 
			filterType : 'listFilter',
			filter : filter
		});
	}, 
	removeListFilter : function(filter){
		Dispatcher.dispatch({
			type : Constants.REMOVE_FILTER, 
			filterType : 'listFilter',
			filter : filter
		});
	}, 
	createNotification : function(isError){
		Dispatcher.dispatch({
			type : Constants.CREATE_NOTIFICATION, 
			isError : isError, 
			text : errorMessage
		});
	},
	dismissNotification : function(id){
		Dispatcher.dispatch({
			type : Constants.DISMISS_NOTIFICATION, 
			id : id
		});
	}
}