var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
    createMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.CREATE_MESSAGE,
            listId: message.listId,
            text: message.text
        });
    }
}