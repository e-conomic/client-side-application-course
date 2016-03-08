var Dispatcher =  require('../dispatcher/dispatcher.js');
var Constants = require('../constants');
var BaseStore = require('./base');


var _messages = [{messageId:1, belongsToList: 1, text: "testmessage1", isArchived: false},
                 {messageId:2, belongsToList: 1, text: "testmessage2", isArchived: false},
                 {messageId:3, belongsToList: 1, text: "testmessage3", isArchived: false},
                 {messageId:4, belongsToList: 2, text: "testmessage4", isArchived: false}];
var _totalElements = 4;


function deepCopy(itemToCopy) {
    var messagesCopy = JSON.parse(JSON.stringify(itemToCopy));
    return messagesCopy;
}


var store = Object.assign({}, BaseStore, {
	getAll: function() {
        return deepCopy(_messages);
    },
    getTotalElements: function() {
        return _totalElements;
    },
    get: function(id) {
        return Object.assign({}, _list.find(function(l) { return l.id == id }));
    }
});

store.dispatchToken = Dispatcher.register(function(payload){

	switch(payload.type) {
        case Constants.ADD_MESSAGE:
            _totalElements++;
            _messages.push({
                messageId: _totalElements,
                belongsToList: payload.listId,
                text: payload.MessageToAdd,
                isArchived: false
            })
            break
        case Constants.DELETE_MESSAGE:
            _messages = _messages.filter(function(obj) {
                return payload.messageId!=(obj.messageId) 
            });
            break
        case Constants.TOGGLE_ARCHIVE_MESSAGE:
            _messages.forEach(function(obj) {
                if (obj.messageId === payload.messageId) {
                    if (obj.isArchived) {
                        obj.isArchived=false;
                    } else {
                        obj.isArchived=true;
                    }
                }
            });
            break
		default:
			return;
	}

	store.emitChange();
});

module.exports = store;


