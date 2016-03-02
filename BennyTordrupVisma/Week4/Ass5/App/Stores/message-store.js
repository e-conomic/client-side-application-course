var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

var _messages = [];

var MessageStore = Object.assign({}, BaseStore, {
    getAll: function() {
        var newMessages = _messages.slice();
        return newMessages;
    },
    
    get: function(messageId) {
        var message = _messages.find(m => m.id == messageId);
        return Object.assign({}, message);
    },
});

function generateId() {
    var ids = _messages.map(m => m.id);
    return Math.max(...ids) + 1;
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
    var msgToChange = _messages.find(m => m-id == messageId);
    msgToChange.isArchived = !msgToChange.isArchived;
}

AppDispatcher.register(payload => {
	switch(payload.type) {
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