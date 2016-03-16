var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var ValidationStore = require("./validation-store");

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

LanguageStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type) {
        case Constants.CREATE_MESSAGE:
            AppDispatcher.waitFor([ValidationStore.distatchToken]);
            var validationResult = ValidationStore.getValidationResult();
            if (!validationResult.isError)
            break;
            
        case Constants.TRANSLATE_MESSAGE:
            break;
            
        default:
            return;
    }
    
    LanguageStore.emitChange();
})

module.exports = LanguageStore;