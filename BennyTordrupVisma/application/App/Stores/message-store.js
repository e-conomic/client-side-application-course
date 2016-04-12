var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var ValidationStore = require("./validation-store");

var MessageActions = require("../Actions/message-actions");

var GoogleTranslate = require('../Utils/googleTranslate');

//var _messages = [];
var _messages = [{
    id: 1,
    list: 1,
    text: "Hello world",
    translatedText: ""
}, {
    id: 2,
    list: 2,
    text: "This is a test",
    translatedText: ""
}, {
    id: 3,
    list: 1,
    text: "Vil du have en is?",
    isArchived: true,
    translatedText: ""
}, {
    id: 4,
    list: 2,
    text: "Habla espanol?",
    isArchived: true,
    translatedText: ""
}, {
    id: 5,
    list: 1,
    text: "Merry Christmas",
    translatedText: ""
}, {
    id: 6,
    list: 2,
    text: "Frohe Ostern",
    translatedText: ""
}, {
    id: 7,
    list: 1,
    text: "We are going home",
    isArchived: true,
    translatedText: ""
}, {
    id: 8,
    list: 2,
    text: "Dette er dansk",
    isArchived: true,
    translatedText: ""
}, {
    id: 9,
    list: 1,
    text: "This is English",
    translatedText: ""
}, {
    id: 10,
    list: 2,
    text: "Sidste besked",
    translatedText: ""
}];

var MessageStore = Object.assign({}, BaseStore, {
    getAll: function() {
        var newMessages = _messages.slice();
        return newMessages;
    },
    
    getAllByListId: function(listId) {
        var listMessages = _messages.filter(m => m.list == listId);
        return listMessages;
    },
    
    get: function(messageId) {
        var message = _messages.find(m => m.id == messageId);
        return (message) ? Object.assign({}, message) : null;
    },
    
    getNewest: function() {
        var message = _messages[_messages.length-1];
        return (message) ? Object.assign({}, message): null;
    },
});

function generateId() {
    if (_messages.length == 0) {
        return 1;
    } else {
        var ids = _messages.map(m => m.id);
        return Math.max(...ids)+1;
    }
}

function createMessage(payload) {
    _messages.push({
        id: generateId(),
        text: payload.messageText,
        isArchived: false,
        list: payload.listId,
        translatedText: ''
    });
}

function deleteMessage(payload) {
    var removePos = _messages.findIndex(m => m.id == payload.messageId);
    _messages.splice(removePos, 1);
}

function moveMessage(payload) {
    var msgToMove = _messages.find(m => m.id == payload.messageId);
    if (msgToMove)
        msgToMove.list = payload.newListId;
}

function toggleIsArchived(payload){
    var msgToChange = _messages.find(m => m.id == payload.messageId);
    if (msgToChange)
        msgToChange.isArchived = !msgToChange.isArchived;
}

function translateAllMessages(payload) {
    if (payload.destLanguage == "") {
        _messages.forEach(m => m.translatedText = "");
    } else {
        _messages.forEach(m => GoogleTranslate.translateText(m, payload.destLanguage));
    }
}

function translationReceived(payload) {
    var lastEqual = payload.response.req.url.lastIndexOf("=");
    if (lastEqual > -1) {
        var id = Number(payload.response.req.url.substring(lastEqual+1));
        var msgToTranslate = _messages.find(m => m.id == id);
        if (msgToTranslate != null) {        
            var translationResponse = JSON.parse(payload.response.text);
            msgToTranslate.translatedText = translationResponse.data.translations[0].translatedText;
        }
    }
}

MessageStore.dispatchToken = AppDispatcher.register(action => {
	switch(action.type) {
        case Constants.CREATE_MESSAGE:
            AppDispatcher.waitFor([ValidationStore.distatchToken]);
            var validationResult = ValidationStore.getValidationResult();
            if (!validationResult.isError) { 
                createMessage(action.payload);
            }
            break;
            
        case Constants.MOVE_MESSAGE:
            moveMessage(action.payload);
            break;
            
        case Constants.DELETE_MESSAGE:
            deleteMessage(action.payload);
            break;
            
        case Constants.TOGGLE_IS_ARCHIVED:
            toggleIsArchived(action.payload);
            break;
            
        case Constants.TRANSLATE_ALL_MESSAGES:
            translateAllMessages(action.payload);
            break;
            
        case Constants.TRANSLATE_MESSAGE_RESPONSE:
            translationReceived(action.payload);
            break;
            
		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;