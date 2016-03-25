var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var ValidationStore = require("./validation-store");
var MessageStore = require("./message-store");

var GoogleTranslate = require('../Utils/googleTranslate');

var _languages = [];

var LanguageStore = Object.assign({}, BaseStore, {
    getLanguages: function() {
        if (_languages.length == 0) {
            GoogleTranslate.getLangauges('en');
        } else {
            var languages = _languages.slice();
            return languages;
        } 
    },
});

function translateMessage(payload) {
    var newMsg = MessageStore.getNewest();
    GoogleTranslate.translateText(newMsg, payload.language);
}

function languagesReceived(payload) {
    var translationResponse = JSON.parse(payload.response.text);
    translationResponse.data.languages.map(l => {
        _languages.push({
            language: l.language,
            name: l.name,
        })
    })
}

LanguageStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type) {
        case Constants.CREATE_MESSAGE:
            AppDispatcher.waitFor([MessageStore.dispatchToken]);
            translateMessage(action.payload);
            break;
            
        case Constants.REQUEST_LANGUAGES_RESPONSE:
            languagesReceived(action.payload);
            break;
            
        default:
            return;
    }
    
    LanguageStore.emitChange();
})

module.exports = LanguageStore;