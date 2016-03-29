var Dispatcher =  require('../dispatcher/dispatcher.js');
var Constants = require('../constants');
var BaseStore = require('./base');


var _messages = [{messageId:1, belongsToList: 1, text: "hello", isArchived: false, isHidden:false},
                 {messageId:2, belongsToList: 1, text: "this is a message!", isArchived: false, isHidden:false},
                 {messageId:3, belongsToList: 1, text: "more messages", isArchived: false, isHidden:false},
                 {messageId:4, belongsToList: 2, text: "and another one", isArchived: false, isHidden:false}];
var _notificationText = "hi";
var _notificationIsError = false; 
var _showNotification = true;
var _untranslatedMessages = [];
var _firstTimeToTranslate=true;

function deepCopy(itemToCopy) {
    var messagesCopy = JSON.parse(JSON.stringify(itemToCopy));
    return messagesCopy;
}


var store = Object.assign({}, BaseStore, {
	getAll: function() {
        return deepCopy(_messages);
    },
    get: function(id) {
        return Object.assign({}, _list.find(function(l) { return l.id == id }));
    },
    getNotificationText: function() {
        return _notificationText;
    },
    getnotificationIsError: function() {
        return _notificationIsError;
    },
    getshowNotification: function() {
        return _showNotification;
    }
});

store.dispatchToken = Dispatcher.register(function(payload){
	switch(payload.type) {
        case Constants.ADD_MESSAGE:

            if (payload.MessageToAdd.length>200) {
                _notificationText="Message length over limits!"
                _notificationIsError=true
                _showNotification=true
            } else {
                if (_messages.filter(function(e) {return e.text == payload.MessageToAdd}).length > 0) {
                    _notificationText="Message already exists!"
                    _notificationIsError=true
                    _showNotification=true
                } else {
                    var sizeOfMessages=_messages.length;
                    _messages.push({
                        messageId: sizeOfMessages+1,
                        belongsToList: payload.listId,
                        text: payload.MessageToAdd,
                        isArchived: false
                    })
                    _untranslatedMessages.push({
                        messageId: sizeOfMessages+1,
                        belongsToList: payload.listId,
                        text: payload.MessageToAdd,
                        isArchived: false
                    })
                    _notificationText="Message added!"
                    _notificationIsError=false
                    _showNotification=true
                }
            }
            break
        case Constants.DELETE_MESSAGE:
            _messages = _messages.filter(function(obj) {
                return payload.messageId!=(obj.messageId) 
            });
            _notificationText="Message deleted!"
            _notificationIsError=false
            _showNotification=true
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
            _notificationText="Message archived!"
            _notificationIsError=false
            _showNotification=true
            break
        case Constants.HIDE_MESSAGES:
            _messages.forEach(function(obj) {
                if (obj.belongsToList == payload.listId) {
                    obj.isHidden=true;
                }
            });
            _showNotification=false
            break
        case Constants.SHOW_MESSAGES:
            _messages.forEach(function(obj) {
                if (obj.belongsToList == payload.listId) {
                    obj.isHidden=false;
                }
            });
            _showNotification=false
            break
        case Constants.TRANSLATED_MESSAGES:
            if (_firstTimeToTranslate) {
                _firstTimeToTranslate=false;
                _untranslatedMessages = JSON.parse(JSON.stringify(_messages)); 
            }
            for (var i = 0; i < _messages.length; i++) {
                _messages[i].text=payload.translatedMessages[i].translatedText;
            }  
            _showNotification=true
            _notificationText="Translation succesful!"
            break
        case Constants.CANCEL_TRANSLATION:
            _messages = JSON.parse(JSON.stringify(_untranslatedMessages)); 
            _showNotification=true
            _notificationText="Translation disabled!"
            break
		default:
			return;
	}

	store.emitChange();
});

module.exports = store;


