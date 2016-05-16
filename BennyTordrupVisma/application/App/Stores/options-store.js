var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

var _options = {
    showCombinedMessages: true,
    selectedLanguage: '',
};

var OptionsStore = Object.assign({}, BaseStore, {
    get: function() {
        return Object.assign({}, _options);
    },
    
});

function updateOptions(payload) {
    var oldOptions = _options;
    _options = {
        showCombinedMessages: payload.showCombinedMessages,
        selectedLanguage: oldOptions.selectedLanguage
   };
}

function updateSelectedLanguage(payload) {
    var oldOptions = _options;
    _options = {
        showCombinedMessages: oldOptions.showCombinedMessages,
        selectedLanguage: payload.selectedLanguage
    };
}

var registeredCallback = action => {
    switch (action.type){
        case Constants.UPDATE_OPTIONS:
            updateOptions(action.payload);
            break;
      
        case Constants.UPDATE_LANGUAGE:
            updateSelectedLanguage(action.payload);
            break;
                  
        default:
            return;
    }
    
    OptionsStore.emitChange();
}

OptionsStore.dispatchToken = AppDispatcher.register(registeredCallback);

module.exports = OptionsStore;