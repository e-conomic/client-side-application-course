var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var ValidationStore = require("./validation-store");
var MessageStore = require("./message-store");

var GoogleTranslate = require('../Utils/googleTranslate');

var _languages = [{
    iso639_1: 'da',
    name: 'Danish'
}, {
    iso639_1: 'en',
    name: 'English'
}, {
    iso639_1: 'de',
    name: 'German'
}, {
    iso639_1: 'es',
    name: 'Spanish'
}];

var LanguageStore = Object.assign({}, BaseStore, {
    getLanguages: function() {
        var languages = _languages.slice();
        return languages; 
    },
});

function translateMessage(payload) {
    var newMsg = MessageStore.getNewest();
    GoogleTranslate.translateText(newMsg, payload.language);
}

LanguageStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type) {
        case Constants.CREATE_MESSAGE:
            AppDispatcher.waitFor([MessageStore.dispatchToken]);
            translateMessage(action.payload);
            break;
            
        default:
            return;
    }
    
    LanguageStore.emitChange();
})

module.exports = LanguageStore;