var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
    createMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.CREATE_MESSAGE,
            listId: message.listId,
            text: message.text
        });
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
    moveUpMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.MOVEUP_MESSAGE,
            id: message.id,
            listId: message.listId
        });
    },
    moveDownMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.MOVEDOWN_MESSAGE,
            id: message.id,
            listId: message.listId
        });
    },
}