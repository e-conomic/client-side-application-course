var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var BaseStore = require('./base');

var _messages = [
                    {id: 0, listId: 0, text: "testmessage for list 0", translation: '', isArchived: false},
                    {id: 3, listId: 0, text: "testmessage for list 0", translation: '', isArchived: true},
                    {id: 1, listId: 1, text: "testmessage for list 1", translation: '', isArchived: false},
                    {id: 2 ,listId: 1, text: "testmessage for list 2", translation: '', isArchived: false}
                 ];

var _validationMessage = {isError: false, message: "Message is ok", isDismissed: true };

var _languageCodes = ["da","en","ru"];

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
    },
    getLanguageCodes: function() {
        return JSON.parse(JSON.stringify(_languageCodes));  
    },  
});

 Dispatcher.register(function(payload){

    switch(payload.type) {

        case Constants.ERROR_CREATE_MESSAGE:
            _validationMessage.isError = true;
            _validationMessage.message = payload.errorMessage;
            _validationMessage.isDismissed = false;

            break

        case Constants.CREATE_MESSAGE:
             _messages.push({
                    id: _messages.length,
                    listId: payload.listId,
                    text: payload.text,
                    isArchived: false,
                    translation: ''
                });
            _validationMessage.isError = false;
            _validationMessage.message = 'Message is OK';
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

        case Constants.DISMISS_NOTIFICATION:
                _validationMessage.isDismissed = true;
            break

        case Constants.TRANSLATE_MESSAGES:

            var json = JSON.parse(payload.translatedMessages);
            var translatedMessages = json['data']['translations'];

            _messages.map(function(message, index) {
                return message.translation = translatedMessages[index]['translatedText'];
            });
            
            console.log(payload.translatedMessages);
            break
            
        case Constants.GET_LANGUAGE_CODES:

            var json = JSON.parse(payload.languageCodes);
            var languages = json['data']['languages'];
            _languageCodes = [];
            for (var language of languages) {
                _languageCodes.push(language.language);
            }
            break
    }

    MessageStore.emitChange();

});

module.exports = MessageStore;


