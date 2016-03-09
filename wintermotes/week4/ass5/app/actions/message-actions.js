var Constants = require('../constants')
var Dispatcher = require('../dispatcher')

module.exports = {
	createMessage : function(messageContent, listId){
		console.log("message-actions called with params: " + messageContent + ", " + listId)
		Dispatcher.dispatch({
			type : Constants.CREATE_MESSAGE, 
			listId : listId, 
			messageContent : messageContent
		});
	}
}

