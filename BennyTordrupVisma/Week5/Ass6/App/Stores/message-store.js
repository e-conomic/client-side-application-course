var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
// var ListStore = require("../Stores/list-store");
// var ListActions = require("../Actions/list-actions");

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

function isMessageValid(input, listId) {
    if (input.length == 0) {
        window.alert("You must enter a text to add.");
        return false;
    }
    
    if (input.length > 200)	{
        window.alert("The input may not exceed 200 characters.");
        return false;
    }
    
    if (listId == 0) {
        window.alert("You have to select a list to add message to.");
        return false;
    }

    var messages = MessageStore.getAll();
    if (messages.some(m => m.text == input)) {		
        window.alert("The message is already member of a list and cannot be added");
        return false;
    }
    
    return true;
}
	
function createMessage(messageText, listId) {
    if (isMessageValid(messageText, listId)) {
        _messages.push({
            id: generateId(),
            text: messageText,
            isArchived: false,
            list: listId
        });
    }
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

AppDispatcher.register(action => {
	switch(action.type) {
        case Constants.CREATE_MESSAGE:
            createMessage(payload.messageText, payload.listId);
            break;
            
        case Constants.MOVE_MESSAGE:
            moveMessage(payload.messageId, payload.newListId);
            break;
            
        case Constants.DELETE_MESSAGE:
            deleteMessage(payload.messageId);
            break;
            
        case Constants.TOGGLE_IS_ARCHIVED:
            toggleIsArchived(payload.messageId);
            break;

		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;