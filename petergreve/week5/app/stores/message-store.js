var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var BaseStore = require('./base');

var _messages = [
                    {id: 0, listId: 0, text: "testmessage for list 0", isArchived: false, isFiltered: false},
                    {id: 3, listId: 0, text: "testmessage for list 0", isArchived: true, isFiltered: false},
                    {id: 1, listId: 1, text: "testmessage for list 1", isArchived: false, isFiltered: false},
                    {id: 2 ,listId: 2, text: "testmessage for list 2", isArchived: false, isFiltered: false}
                 ];

var MessageStore = Object.assign({}, BaseStore, {
    getAll: function() {
        return JSON.parse(JSON.stringify(_messages));
    },
    get: function(id) {
        var message = _messages.find(function(m) { return m.id == id });
        return JSON.parse(JSON.stringify(message));
    },
    getForList: function(listId) {
        var messages =  _messages.filter((m) => {
            return m.listId == listId;
        });
        return JSON.parse(JSON.stringify(messages))
    }
});

 Dispatcher.register(function(payload){

    switch(payload.type) {

        case Constants.CREATE_MESSAGE:
            if (payload.text.length < 200) {
                _messages.push({
                    id: _messages.length,
                    listId: payload.listId,
                    text: payload.text,
                    isArchived: false
                })
            } else {
                MessageStore.emitError();
                return
            }

            break

        case Constants.DELETE_MESSAGE:
                _messages = _messages.filter((m) => {
                return m.id != payload.id;
            })
            break

        case Constants.ARCHIVE_MESSAGE:
                var message = _messages.find((m) => {
                                    return m.id == payload.id;
                                });
                message.isArchived = true
            break

        case Constants.UNARCHIVE_MESSAGE:
                var message = _messages.find((m) => {
                                    return m.id == payload.id;
                                });
                message.isArchived = false
            break

        case Constants.MOVE_MESSAGE:
                var message = _messages.find((m) => {
                                return m.id == payload.id;
                            });
                message.listId = payload.targetListId

            break
        case Constants.FILTER_MESSAGE:
                var message = _messages.find((m) => {
                                    return m.id == payload.id;
                                });
                message.isFiltered = true
            break
        case Contants.UNFILTER_MESSAGE:
                var message = _messages.find((m) => {
                                    return m.id == payload.id;
                                });
                message.isFiltered = false
            break
    }

    MessageStore.emitChange();
});

module.exports = MessageStore;


