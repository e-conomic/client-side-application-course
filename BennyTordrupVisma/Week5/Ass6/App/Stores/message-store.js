var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var ValidationStore = require("./validation-store");

//var _messages = [];
var _messages = [{
    id: 1,
    list: 1,
    text: "Test 1-1"
}, {
    id: 2,
    list: 2,
    text: "Test 2-1"
}, {
    id: 3,
    list: 1,
    text: "Test 1-2",
    isArchived: true
}, {
    id: 4,
    list: 2,
    text: "Test 2-2",
    isArchived: true
}, {
    id: 5,
    list: 1,
    text: "Test 1-3"
}, {
    id: 6,
    list: 2,
    text: "Test 2-3"
}, {
    id: 7,
    list: 1,
    text: "Test 1-4",
    isArchived: true
}, {
    id: 8,
    list: 2,
    text: "Test 2-4",
    isArchived: true
}, {
    id: 9,
    list: 1,
    text: "Test 1-5"
}, {
    id: 10,
    list: 2,
    text: "Test 2-5"
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