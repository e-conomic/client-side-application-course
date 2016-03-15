var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var ValidationStore = require("./validation-store");

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
});

function generateId() {
    if (_messages.length == 0) {
        return 1;
    } else {
        var ids = _messages.map(m => m.id);
        return Math.max(...ids) + 1;
    }
}

function createMessage(messageText, listId) {
    _messages.push({
        id: generateId(),
        text: messageText,
        isArchived: false,
        list: listId
    });
}

function deleteMessage(messageId) {
    var removePos = _messages.findIndex(m => m.id == messageId);
    _messages.splice(removePos, 1);
}

function moveMessage(messageId, newListId) {
    var msgToMove = _messages.find(m => m.id == messageId);
    msgToMove.list = newListId;
}

function toggleIsArchived(messageId){
    var msgToChange = _messages.find(m => m.id == messageId);
    msgToChange.isArchived = !msgToChange.isArchived;
}

MessageStore.dispatchToken = AppDispatcher.register(action => {
	switch(action.type) {
        case Constants.CREATE_MESSAGE:
            AppDispatcher.waitFor([ValidationStore.distatchToken]);
            var validationResult = ValidationStore.getValidationResult();
            if (!validationResult.isError)
                createMessage(action.payload.messageText, action.payload.listId);
            break;
            
        case Constants.MOVE_MESSAGE:
            moveMessage(action.payload.messageId, action.payload.newListId);
            break;
            
        case Constants.DELETE_MESSAGE:
            deleteMessage(action.payload.messageId);
            break;
            
        case Constants.TOGGLE_IS_ARCHIVED:
            toggleIsArchived(action.payload.messageId);
            break;

		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;