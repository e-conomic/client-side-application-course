var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

var _options = {
    showCombinedMessages: false
};

var OptionsStore = Object.assign({}, BaseStore, {
    get: function() {
        return Object.assign({}, _options);
    },
    
});

function updateOptions(showCombinedMessages) {
    _options = {
        showCombinedMessages: showCombinedMessages
    };
}

AppDispatcher.register(payload => {
    switch (payload.type){
        case Constants.UPDATE_OPTIONS:
            updateOptions(payload.showCombinedMessages);
            break;
            
        default:
            return;
    }
    
    OptionsStore.emitChange();
});

module.exports = OptionsStore;