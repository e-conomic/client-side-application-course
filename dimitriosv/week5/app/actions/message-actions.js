var Constants = require('../constants');
var Dispatcher =  require('../dispatcher/dispatcher.js');

module.exports = {
	addMessage: function(listId,MessageToAdd) {
        Dispatcher.dispatch({
            type: Constants.ADD_MESSAGE,
            listId: listId,
            MessageToAdd: MessageToAdd,
        });
    },
    deleteMessage: function(messageId) {
        Dispatcher.dispatch({
            type: Constants.DELETE_MESSAGE,
            messageId: messageId,
        });
    },
    toggleArchiveMessage: function(messageId) {
        Dispatcher.dispatch({
            type: Constants.TOGGLE_ARCHIVE_MESSAGE,
            messageId: messageId,
        });
    },
    hideMessages: function(listId) {
        Dispatcher.dispatch({
            type: Constants.HIDE_MESSAGES,
            listId: listId,
        });
    },
    showMessages: function(listId) {
        Dispatcher.dispatch({
            type: Constants.SHOW_MESSAGES,
            listId: listId,
        });
    },
}