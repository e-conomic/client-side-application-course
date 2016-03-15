var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher/dispatcher');

// require message store

module.exports = {
    createMessage: function(message) {

        // if validate
            Dispatcher.dispatch({
                type: Constants.CREATE_MESSAGE,
                listId: message.listId,
                text: message.text
            });
        // else
            // dispatch validation failed

    },
    archiveMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.ARCHIVE_MESSAGE,
            id: message.id
        });
    },
    unarchiveMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.UNARCHIVE_MESSAGE,
            id: message.id
        });
    },
    deleteMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.DELETE_MESSAGE,
            id: message.id
        });
    },
    moveMessage: function(message, targetListId) {

        Dispatcher.dispatch({
            type: Constants.MOVE_MESSAGE,
            id: message.id,
            listId: message.listId,
            targetListId: targetListId
        });
    },
    dismissNotification: function() {
        Dispatcher.dispatch({
            type: Constants.DISMISS_NOTIFICATION,
        });
    }
}