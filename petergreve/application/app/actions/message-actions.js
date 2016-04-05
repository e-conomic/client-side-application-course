var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher/dispatcher');
var request = require("superagent");
var MessageStore = require('../stores/message-store');
import key from '../key';

module.exports = {
    createMessage: function(message) {
        var _messages = MessageStore.getAll();

        if (_messages.some(m => m.text  === message.text)) {
            Dispatcher.dispatch({
                type: Constants.ERROR_CREATE_MESSAGE,
                listId: message.listId,
                errorMessage: 'Message is not unique'
            }); 
        }
        else if (message.text.lenth > 200) {
            Dispatcher.dispatch({
                type: Constants.ERROR_CREATE_MESSAGE,
                listId: message.listId,
                errorMessage: 'Message is too long'
            }); 
        }
        else
            Dispatcher.dispatch({
                type: Constants.CREATE_MESSAGE,
                listId: message.listId,
                text: message.text
            });
    },
    archiveMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.ARCHIVE_MESSAGE,
            id: message.id
        });
    },
    unarchiveMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.UNARCHIVE_MESSAGE,
            id: message.id
        });
    },
    deleteMessage: function(message) {

        Dispatcher.dispatch({
            type: Constants.DELETE_MESSAGE,
            id: message.id
        });
    },
    moveMessage: function(message, targetListId) {

        Dispatcher.dispatch({
            type: Constants.MOVE_MESSAGE,
            id: message.id,
            listId: message.listId,
            targetListId: targetListId
        });
    },
    dismissNotification: function() {
        Dispatcher.dispatch({
            type: Constants.DISMISS_NOTIFICATION,
        });
    },
    translateMessages: function(language) {
        var _messages = MessageStore.getAll();
        var message = '';

        for(var m of _messages) {
            message = message + 'q=' + m.text.replace(/ /g, '+') + '&';
        }

        var url = 'https://www.googleapis.com/language/translate/v2';

        var targetLanguage = '&target=' + language;

        var query = '?' + message + targetLanguage + "&key=" + key;

        request.get(url + query)
            .set('Accept', 'application/json')
            .end((err, response) => {
                    if (err) {
                        console.log("Error requesting Google translate API");
                    } else {
                        Dispatcher.dispatch({
                            type: Constants.TRANSLATE_MESSAGES,
                            translatedMessages: response.body
                        });
                    }
                });
    },
    fetchLanguageCodes: function() {

        var url = 'https://www.googleapis.com/language/translate/v2/languages';

        request.get(url + '?key=' + key)
            .set('Accept', 'application/json')
            .end((err, response) => {
                    if (err) {
                        console.log("Error requesting Google translate API");
                    } else {
                        Dispatcher.dispatch({
                            type: Constants.GET_LANGUAGE_CODES,
                            languageCodes: response.body
                        })
                    }
                });

        console.log("fetching language codes");
    }
}