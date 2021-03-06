var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

var _validationResult = {
    message: '',
    isError: false
};

var ValidationStore = Object.assign({}, BaseStore, {
    getValidationResult: function() {
        return Object.assign({}, _validationResult);
    }
});

function _validateMessage(payload) {
    if (payload.messageText.length == 0) {
        _validationResult = {
            message: 'You must enter a text to add.',
            isError: true,
        }
    }
    else if (payload.messageText.length > 200) {
        _validationResult = {
            message: 'The input may not exceed 200 characters.',
            isError: true,
        }
    }
    else if (payload.messages.some(m => m.text == payload.messageText)) {
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

function _validateList(payload) {
    if (payload.lists.some(l => l.name == payload.listName)) {
        _validationResult = {
            message: 'List already exists',
            isError: true,
        }
        //throw new Error("List already exists");
    }
    else {
        _validationResult = {
            message: 'List added.',
            isError: false,
        }
    }
}

var registeredCallback = action => {
    switch (action.type) {
        case Constants.CREATE_LIST:
            _validateList(action.payload);
            break;
            
        case Constants.CREATE_MESSAGE:
            _validateMessage(action.payload);
            break;
            
        default:
            return;
    }
    
    ValidationStore.emitChange();
}

ValidationStore.distatchToken = AppDispatcher.register(registeredCallback);

module.exports=ValidationStore;