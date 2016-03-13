var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var BaseStore = require('./base');

var _messages = [
                    {id: 0, listId: 0, text: "testmessage for list 0", isArchived: false, isHidden: false},
                    {id: 3, listId: 0, text: "testmessage for list 0", isArchived: true, isHidden: false},
                    {id: 1, listId: 1, text: "testmessage for list 1", isArchived: false, isHidden: false},
                    {id: 2 ,listId: 1, text: "testmessage for list 2", isArchived: false, isHidden: false}
                 ];

var _validationMessage = {isError: false, message: "Message is ok", isDismissed: true };

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
    },
    getValidationMessage: function() {
        return Object.assign({}, _validationMessage);
    }
});

 Dispatcher.register(function(payload){

    switch(payload.type) {

        case Constants.CREATE_MESSAGE:
            if (payload.text.length > 200) {
                _validationMessage.isError = true;
                _validationMessage.message = 'Message is too long';
            }
            else if (_messages.some(m => m.text  === payload.text)) {
                _validationMessage.isError = true;
                _validationMessage.message = 'Message is not unique';                
            }
            else
            {
                _messages.push({
                    id: _messages.length,
                    listId: payload.listId,
                    text: payload.text,
                    isArchived: false,
                    isHidden: false
                });
                _validationMessage.isError = false;
                _validationMessage.message = 'Message is OK';
            } 
            
            _validationMessage.isDismissed = false;

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
        case Constants.HIDE_MESSAGES:
 
                var filteredMessages = _messages.filter((m) => {
                    return m.listId == payload.listId;
                });
                filteredMessages.forEach((message, index, array) => {
                    message.isHidden = true;
                });
            break
        case Constants.UNHIDE_MESSAGES:
  
                var filteredMessages = _messages.filter((m) => {
                    return m.listId == payload.listId;
                });
                filteredMessages.forEach((message, index, array) => {
                    message.isHidden = false;
                });
            break
        case Constants.DISMISS_NOTIFICATION:
                _validationMessage.isDismissed = true;
            break
    }

    MessageStore.emitChange();

});

module.exports = MessageStore;


