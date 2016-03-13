var Constants = require('../constants')
var Dispatcher = require('../dispatcher')

module.exports = {
	createMessage : function(content, listId){
		Dispatcher.dispatch({
			type : Constants.CREATE_MESSAGE, 
			listId : listId, 
			content : content
		});
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
	}
}

