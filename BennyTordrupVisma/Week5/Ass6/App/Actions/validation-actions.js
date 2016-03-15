var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
    validateMessage: function(messageText, messageList) {
        AppDispatcher.dipatch({
            type: Constants.VALIDATE_MESSAGE,
            messageText: messageText,
            messageList: messageList,
        })
    }
}