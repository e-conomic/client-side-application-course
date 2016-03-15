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
    }
}