var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var BaseStore = require('./base');

var _messages = [
                    {messageId: 0, listId: 0, text: "testmessage for list 0", isArchived: false},
                    {messageId: 3, listId: 0, text: "testmessage for list 0", isArchived: true},
                    {messageId: 1, listId: 1, text: "testmessage for list 1", isArchived: false},
                    {messageId: 2 ,listId: 2, text: "testmessage for list 2", isArchived: false}
                 ];

var MessageStore = Object.assign({}, BaseStore, {
    getAll: function() {
        return _messages;
    },
    get: function(id) {
        return Object.assign({}, _messages.find(function(m) { return m.id == id }));
    }
});

 Dispatcher.register(function(payload){

	switch(payload.type) {

        case Constants.CREATE_MESSAGE:
            _messages.push({
                id: _messages.length,
                listId: payload.listId,
                text: payload.text,
                isArchived: false
            })
            break

        case Constants.DELETE_MESSAGE:
            break

        case Constants.ARCHIVE_MESSAGE:
            break

        case Constants.UNARCHIVE_MESSAGE:
            break

        case Constants.MOVE_MESSAGE:
            break

		default:
			return;
	}

	MessageStore.emitChange();
});

module.exports = MessageStore;

