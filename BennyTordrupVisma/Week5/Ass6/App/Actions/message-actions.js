var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
	createMessage: function(messageText, listId, messages) {
		AppDispatcher.dispatch({
			type: Constants.CREATE_MESSAGE,
            payload: {
                messageText: messageText,
                listId: listId,
                messages: messages,
            }
		});
	},
    
    deleteMessage: function(messageId) {
        AppDispatcher.dispatch({
            type: Constants.DELETE_MESSAGE,
            payload: {
                messageId: messageId,
            }
        });
    },
    
    moveMessage: function(messageId, newListId) {
        AppDispatcher.dispatch({
            type: Constants.MOVE_MESSAGE,
            payload: {
                messageId: messageId,
                newListId: newListId,
            }
        });
    },
    
    toggleIsArchived: function(messageId) {
        AppDispatcher.dispatch({
            type: Constants.TOGGLE_IS_ARCHIVED,
            payload: {
                messageId: messageId,
            }
        });
    },
}