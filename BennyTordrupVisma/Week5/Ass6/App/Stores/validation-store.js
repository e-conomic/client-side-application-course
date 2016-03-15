var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var MessageStore = require("./message-store");

var _validationResult = {
    message: '',
    isError: false
};

var ValidationStore = Object.assign({}, BaseStore, {
    getValidationResult: function() {
        return Object.assign({}, _validationResult);
    }
});

function _validateMessage(messageText) {
    var messages = MessageStore.getAll();
    
    if (messageText.length == 0) {
        _validationResult = {
            message: 'You must enter a text to add.',
            isError: true,
        }
    }
    else if (messageText.length > 200) {
        _validationResult = {
            message: 'The input may not exceed 200 characters.',
            isError: true,
        }
    }
    else if (messages.some(m => m.text == messageText)) {
        _validationResult = {
            message: 'The message is already entered and cannot be added.',
            isError: true,
        }
    }
    else {
        _validationResult = {
            message: 'Message added.',
            isError: false,
        }
    }
}

ValidationStore.distatchToken = AppDispatcher.register(action => {
    switch (action.type) {
        case Constants.CREATE_MESSAGE:
            _validateMessage(action.messageText);
            break;
            
        default:
            return;
    }
    
    ValidationStore.emitChange();
})

module.exports=ValidationStore;